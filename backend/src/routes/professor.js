const express = require('express');
const professorModel = require('../models/professor');
professorDisciplina = require('../models/professorDisciplina');

const router = express.Router();

/* GET curso page. */
router.get('/', (req, res, next) => {
    res.render('Professor', { title: 'Professor' });
});

router.get('/', (req, res, next) => {
    res.render('home');
});

//Retorna somente os professores que estão com IsDeleted 0
router.get('/busca', (req, res, next) => {
    professorModel.findAll({ where: { IsDeleted: 0 } }).then((professor) => {
        res.status(200).json({ professor })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

/* POST Professor */
router.post('/newProfessor', async (req, res, next) => {
    try {
        const { disciplinas, ...data } = req.body;
        const professor = await professorModel.create(data);

        if (disciplinas && disciplinas.length > 0) {
            for (let i = 0; i < disciplinas.length; i++) {
                professorDisciplina.create({
                    IdProfessor: professor.IdProfessor,
                    IdDisciplina: disciplinas[i]
                });
            }
        }
        return res.status(200).json(professor);
    } catch (err) {
        return res.status(400).json({ err });
    }
});

//Remove Professor da listagem ao setar o IsDeleted com 1 
router.put('/remove', (req, res, next) => {
    professorModel.update(
        { IsDeleted: 1 },
        { where: { IdProfessor: req.body.IdProfessor } }
    ).then(() => {
        res.status(200).json({ sucess: 'Professor excluído com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na exclusão. Por favor tente mais tarde!', err });
    });
});

//Edita Nome Professor
router.put('/edit', (req, res, next) => {
    professorModel.update(
        { Nome: req.body.Nome },
        { where: { IdProfessor: req.body.IdProfessor } }
    ).then(() => {
        res.status(200).json({ sucess: 'Professor atualizado com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});


module.exports = router;
