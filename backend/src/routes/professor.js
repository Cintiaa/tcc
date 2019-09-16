const express = require('express');
const db = require('../config/db');
const professorModel = require('../models/professor');
const professorDisciplinas = require('../models/professorDisciplina');
const Disciplina = require('../models/disciplina');
const models = require('../models/index');

const router = express.Router();

//Retorna somente os professores que estão com IsDeleted 0
router.get('/', (req, res, next) => {
    professorModel.findAll({ where: { IsDeleted: 0 } }).then((professor) => {
        res.status(200).json(professor)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Busca pelo ID do professor e retorna um array contendo as informações do mesmo para edição
router.get('/id', (req, res, next) => {
    let IdProfessor = req.query.IdProfessor;
    professorModel.findAll({ where: { IdProfessor: IdProfessor, IsDeleted: 0 } }).then((professor) => {
        res.status(200).json(professor)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Busca pelo Nome do professor e mostra o resultado da busca no front
router.get('/busca', (req, res, next) => {
    const Op = db.Sequelize.Op;
    let Nome = req.query.Nome;
    console.log(Nome);

    if (Nome == null) {
        Nome = null;
    }
    professorModel.findAll({
        where: {
            Nome: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.like]: '%' + Nome + '%'
                }
            },
            IsDeleted: 0
        }
    }).then((professor) => {
        res.status(200).json(professor)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

// Busca todas as disciplinas de um curso
router.get('/buscaProfessorDisciplina', (req, res, next) => {
    const IdProfessor = req.body.IdProfessor;
    console.log('Professor', IdProfessor);
    professorModel.findAll({
        include: [{
            model: models.Disciplina,
            required: true,
            through: {
                where: { IdProfessor: req.body.IdProfessor }
            }
        }]
    }).then((response) => {
        console.log(response);
        disciplinas = response[0] ? response[0].Disciplinas : [];
        res.status(200).json( disciplinas )
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Cria um novo professor
router.post('/newProfessor', async (req, res, next) => {
    let RA = req.body.RA;
    try {
        if (await professorModel.findOne({ where: { RA: RA } }))
            return res.status(400).json({ error: 'RA já cadastrado!' });

        const professor = await professorModel.create(req.body);
        return res.json({ professor });

    } catch (err) {
        return res.status(400).json({ err });
    }
});

//Cria a associação entre um professor e uma disciplina
router.post('/professorDisciplina', async (req, res) => {
    try {
        const disciplinaProfessor = await professorDisciplina.create(req.body);
        return res.json({ disciplinaProfessor });
    } catch (err) {
        return res.status(400).json({ err });
    }
});

//Remove Professor da listagem ao setar o IsDeleted com 1 
router.put('/remove', (req, res, next) => {
    let IdProfessor = req.body.IdProfessor;
    professorModel.update(
        { IsDeleted: 1 },
        { where: { IdProfessor: IdProfessor } }
    ).then(() => {
        res.status(200).json({ sucess: 'Professor removido com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na exclusão. Por favor tente mais tarde!', err });
    });
});

//Edita Nome Professor
router.put('/edit', (req, res, next) => {
    let IdProfessor = req.body.IdProfessor;
    let Nome = req.body.Nome;
    professorModel.update(
        { Nome: Nome },
        { where: { IdProfessor: IdProfessor } }
    ).then(() => {
        res.status(200).json({ sucess: 'Professor atualizado com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});


module.exports = router;
