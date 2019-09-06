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

//Busca somente os alunos que estão ativos (IsDeleted = 0)
router.get('/busca', (req, res, next) => {
    alunoModel.findAll({where:{ IsDeleted: 0}}).then((alunos) => {
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
        IdCurso: req.body.IdCurso,
    }).then(() => {
        res.status(200).json({ sucess: 'Aluno cadastrado com sucesso!' });
        /* res.redirect('/'); */
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
    })
});

//Remove Aluno da listagem ao setar o IsDeleted com 1 
router.put('/remove', (req, res, next) => {
    alunoModel.update(
        { IsDeleted: 1 },
        { where: { IdAluno: req.body.IdAluno } }
    ).then(() => {
        res.status(200).json({ sucess: 'Aluno excluído com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na exclusão. Por favor tente mais tarde!', err });
    });
});

//Edita Nome Aluno
router.put('/edit', (req, res, next) => {
    alunoModel.update(
        { Nome: req.body.Nome },
        { where: { IdAluno: req.body.IdAluno } }
    ).then(() => {
        res.status(200).json({ sucess: 'Aluno atualizado com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});
module.exports = router;
