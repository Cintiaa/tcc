const express = require('express');
const cursoModel = require('../models/curso');

const router = express.Router();

/* GET curso page. */
router.get('/', (req, res, next) => {
    res.render('Curso', { title: 'Curso' });
});

router.get('/', (req, res, next) => {
    res.render('home');
});

//Rota de busca
router.get('/busca', (req, res, next) => {
    cursoModel.findAll().then((cursos) => {
        res.status(200).json({ cursos })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

/* POST curso */
router.post('/newCurso', (req, res, next) => {
    cursoModel.create({
        Sigla: req.body.Sigla,
        Nome: req.body.Nome,
        IsDeleted: 0,
    }).then(() => {
        res.status(200).json({ sucess: 'Curso cadastrado com sucesso!' });
        /* res.redirect('/'); */
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
    })
});

module.exports = router;
