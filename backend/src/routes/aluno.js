const express = require('express');
const db = require('../config/db');
const alunoModel = require('../models/aluno');
const Cursos = require('../models/curso');

const models = require('../models/index');

const router = express.Router();


//Lista todos os alunos cadastrados que não foram excluídos (IsDeleted = 0)
router.get('/', (req, res, next) => {
    alunoModel.findAll({ where: { IsDeleted: 0 } }).then((alunos) => {
        res.status(200).json(alunos)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Busca pelo ID do aluno e retorna um array contendo as informações do mesmo para edição
router.get('/id', (req, res, next) => {
    let IdAluno = req.query.IdAluno;
    alunoModel.findAll({ where: { IdAluno: IdAluno, IsDeleted: 0 } }).then((alunos) => {
        res.status(200).json(alunos)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Retorna os alunos que coincidem com o RA e Nome buscados
router.get('/busca', (req, res) => {
    const Op = db.Sequelize.Op;

    let RA = req.query.RA;
    let Nome = req.query.Nome;
    let IdCurso = req.query.IdCurso

    if (RA == null) {
        RA = null;
    }
    if (Nome == null) {
        Nome = null;
    }
    if (IdCurso == null) {
        IdCurso = null;
    }
    alunoModel.findAll({
        include: [
            { model: models.Curso },
        ],
        where: {
            RA: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.like]: '%' + RA + '%'
                }
            },
            Nome: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.like]: '%' + Nome + '%'
                }
            },
            IdCurso: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.like]: '%' + IdCurso + '%'
                }
            },
            IsDeleted: 0
        }
    }).then((alunos) => {
        res.status(200).json(alunos);
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Retorna o último aluno inserido no banco
router.get('/ultimo', (res, resq) => {
    alunoModel.findAll({ where: { IsDeleted: 0 } }).then((response) => {
        alunos = response[response.length - 1];
        console.log(alunos);
        res.status(200).json(alunos)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

/* POST Aluno */
router.post('/newAluno', async (req, res) => {
    let RA = req.body.RA;
    console.log(RA);

    try {
        if (await alunoModel.findOne({ where: { RA: RA } }))
            return res.status(400).json({ error: 'RA já cadastrado!' });

        const aluno = await alunoModel.create(req.body);
        console.log(aluno);

        return res.json(aluno);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
    }
});

//Remove Aluno da listagem ao setar o IsDeleted com 1 
router.put('/remove', (req, res, next) => {
    let IdAluno = req.body.IdAluno;
    console.log(IdAluno);
    alunoModel.update(
        { IsDeleted: 1 },
        { where: { IdAluno: IdAluno } }
    ).then(() => {
        res.status(200).json({ sucess: 'Aluno removido com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na exclusão. Por favor tente mais tarde!', err });
    });
});

//Edita Nome e Curso Aluno
router.put('/edit', (req, res, next) => {
    let IdAluno = req.body.IdAluno;
    let Nome = req.body.Nome;
    let IdCurso = req.body.IdCurso;
    alunoModel.update(
        { Nome: Nome, IdCurso: IdCurso },
        { where: { IdAluno: IdAluno } }
    ).then(() => {
        res.status(200).json({ sucess: 'Aluno atualizado com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});
module.exports = router;
