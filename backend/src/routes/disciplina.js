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

//Rota de busca
router.get('/busca', (req, res, next) => {
    disciplinaModel.findAll().then((disciplinas) => {
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

module.exports = router;
