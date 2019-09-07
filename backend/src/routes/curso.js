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

//Retorno somente os cursos que possuem IsDeleted = 0
router.get('/busca', (req, res, next) => {
    cursoModel.findAll({where:{ IsDeleted: 0}}).then((cursos) => {
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
    }).then(curso => {
        res.status(200).json({ sucess: 'Curso cadastrado com sucesso!', curso});
        /* res.redirect('/'); */
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
    })
});

//Remove Curso da listagem ao setar o IsDeleted com 1
router.put('/remove', (req, res, next) => {
    cursoModel.update(
        { IsDeleted: 1 },
        { where: { IdCurso: req.body.IdCurso } }
    ).then(() => {
        res.status(200).json({ sucess: 'Curso excluído com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na exclusão. Por favor tente mais tarde!', err });
    });
});

//Edita Nome Curso
router.put('/edit', (req, res, next) => {
    console.log(req.body);
    cursoModel.update(
        { Sigla: req.body.Sigla,
          Nome: req.body.Nome },
        { where: { IdCurso: req.body.IdCurso } }
    ).then(() => {
        res.status(200).json({ sucess: 'Curso atualizado com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});

module.exports = router;
