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

//Rota de busca
router.get('/busca', (req, res, next) => {
    professorModel.findAll().then((professor) => {
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

module.exports = router;
