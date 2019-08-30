const express = require('express');
const professorModel = require('../models/professor');

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
router.post('/newProfessor', (req, res, next) => {
    professorModel.create({
        RA: req.body.RA,
        Nome: req.body.Nome,
        IsDeleted: 0,
    }).then(() => {
        res.status(200).json({ sucess: 'Professor cadastrado com sucesso!' });
        /* res.redirect('/'); */
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
    })
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
