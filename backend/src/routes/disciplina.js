const express = require('express');
const disciplinaModel = require('../models/Disciplina');

const router = express.Router();

/* GET Disciplina page. */
router.get('/', (req, res, next) => {
    res.render('Disciplina', { title: 'Disciplina' });
});

router.get('/', (req, res, next) => {
    res.render('home');
});

//Retorna somente as disciplinas que possuem IsDeleted = 0
router.get('/busca', (req, res, next) => {
    disciplinaModel.findAll({where:{ IsDeleted: 0}}).then((disciplinas) => {
        res.status(200).json({ disciplinas })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

/* POST Disciplina */
router.post('/newDisciplina', (req, res, next) => {
    disciplinaModel.create({
        Sigla: req.body.Sigla,
        Nome: req.body.Nome,
        IsDeleted: 0,
        CursoIdCurso: req.body.CursoIdCurso
        }).then(() => {
            res.status(200).json({ sucess: 'Disciplina cadastrada com sucesso!' });
            /* res.redirect('/'); */
        }).catch((err) => {
            res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
        })
});

//Remove Disciplina da listagem ao setar o IsDeleted com 1 
router.put('/remove', (req, res, next) => {
    disciplinaModel.update(
        { IsDeleted: 1 },
        { where: { IdDisciplina: req.body.IdDisciplina } }
    ).then(() => {
        res.status(200).json({ sucess: 'Disciplina excluído com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na exclusão. Por favor tente mais tarde!', err });
    });
});

//Edita Nome Disciplina
router.put('/edit', (req, res, next) => {
    disciplinaModel.update(
        { Sigla: req.body.Sigla },
        { Nome: req.body.Nome },
        { where: { IdDisciplina: req.body.IdDisciplina } }
    ).then(() => {
        res.status(200).json({ sucess: 'Disciplina atualizado com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});

module.exports = router;
