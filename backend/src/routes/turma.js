const express = require('express');
const turmaModel = require('../models/turma');
const turmaAluno = require('../models/turmaAluno');
const db = require('../config/db');
const models = require('../models/index');

const router = express.Router();

//Retorna todas as turmas que estão ativos (IsDeleted = 0)
router.get('/', (req, res, next) => {
    turmaModel.findAll({ where: { IsDeleted: 0 } }).then((turmas) => {
        res.status(200).json(turmas)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Busca turmas com base na Sigla inserida 
router.get('/busca', (req, res, next) => {
    const Op = db.Sequelize.Op;
    let Sigla = req.query.Sigla;
    if (Sigla == null) {
        Sigla = null;
    }
    turmaModel.findAll({
        include: [{
            model: models.Disciplina,
        }],
        where: {
            Sigla: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.like]: '%' + Sigla + '%'
                }
            },
            IsDeleted: 0
        },
    }).then((turmas) => {
        res.status(200).json(turmas)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Busca pelo ID da turma e retorna um array contendo as informações da mesma para edição
router.get('/id', (req, res, next) => {
    let IdTurma = req.query.IdTurma;
    turmaModel.findAll({ where: { IdTurma: IdTurma, IsDeleted: 0 } }).then((turma) => {
        res.status(200).json(turma)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});


// Busca todos os alunos de uma determinada turma
router.get('/buscaTurmaAluno', (req, res, next) => {
    const IdTurma = req.query.IdTurma;
    console.log('Turma', IdTurma);
    models.Turma.findAll({
        include: [{
            model: models.Aluno,
            required: true,
            through: {
                where: { IdTurma: IdTurma, IsDeleted: 0 },
            }
        }],
    }).then((response) => {
        console.log(response);
        alunos = response[0] ? response[0].Alunos :  [];
        res.status(200).json(alunos);
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

/* POST Turma */
router.post('/newTurma', async (req, res, next) => {

    try {
        if (await turmaModel.findOne({ where: { Sigla: req.body.Sigla } }))
            res.status(400).json({ error: 'Sigla já cadastrada' });

        const turma = await turmaModel.create(req.body);
        return res.status(200).json(turma);
    } catch (err) {
        console.log(err)
        return res.status(400).json({ err });
    }
});

//Cria a associação entre uma turma e um aluno
router.post('/turmaAluno', async (req, res) => {
    console.log(req.body);
    try {
        const alunoTurma = await turmaAluno.create(req.body);
        return res.json({ alunoTurma });
    } catch (err) {
        return res.status(400).json({ err });
    }
});

//Remove a Turma da listagem ao setar o IsDeleted com 1 
router.put('/remove', (req, res, next) => {
    turmaModel.update(
        { IsDeleted: 1 },
        { where: { IdTurma: req.body.IdTurma } }
    ).then(() => {
        res.status(200).json({ sucess: 'Turma removida com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na exclusão. Por favor tente mais tarde!', err });
    });
});

//Desvincula Aluno da Turma
router.put('/removeAluno', (req, res) => {
    let IdAluno = req.body.IdAluno;
    console.log(IdAluno);
    turmaAluno.update(
        { IsDeleted: 1 },
        { where: { IdAluno: IdAluno } }
    ).then(() => {
        res.status(200).json({ sucess: 'Aluno desvinculada com sucesso!' })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Edita turma
router.put('/edit', (req, res, next) => {
    turmaModel.update(
        {
            Sigla: req.body.Sigla,
            IdDisciplina: req.body.IdDisciplina
        },
        { where: { IdTurma: req.body.IdTurma } }
    ).then(() => {
        res.status(200).json({ sucess: 'Turma atualizada com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});
module.exports = router;
