const express = require('express');
const alunoModel = require('../models/aluno');

const router = express.Router();

/* GET curso page. */
router.get('/', (req, res, next) => {
    res.render('Aluno', { title: 'Aluno' });
});

router.get('/', (req, res, next) => {
    res.render('home');
});

//Rota de busca
router.get('/busca', (req, res, next) => {
    alunoModel.findAll().then((alunos) => {
        res.status(200).json({ alunos })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

/* POST Aluno */
router.post('/newAluno', (req, res, next) => {
    alunoModel.create({
        RA: req.body.RA,
        Nome: req.body.Nome,
        IsDeleted: 0,
        CursoIdCurso: req.body.CursoIdCurso,
    }).then(() => {
        res.status(200).json({ sucess: 'Aluno cadastrado com sucesso!' });
        /* res.redirect('/'); */
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
    })
});

module.exports = router;
