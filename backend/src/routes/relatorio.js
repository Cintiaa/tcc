const express = require('express');
const db = require('../config/db');
const presencaModel = require('../models/presenca');
const models = require('../models/index');

const router = express.Router();

router.get('/', (req, res) => {
    let IdTurma = req.query.IdTurma;
    presencaModel.findAll({
        include: [
            { model: models.Turma }, 
            { model: models.Aluno }, 
        ],
        where: {
            IdTurma: IdTurma,
            IsDeleted: 0
        }
    }).then((presencas) => {
        res.status(200).json(presencas);
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro na execução da busca', err });
    });
});

router.post('/newPresenca', async (req, res) => {
    try {
        const presenca = await presencaModel.create({
            QtdPresenca: req.body.QtdPresenca,
            DtAula: Date.now(),
            IdAluno: req.body.IdAluno,
            IdTurma: req.body.IdTurma,
            IsDeleted: 0
        });
        console.log(presenca);
        return res.json({ presenca });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde' });
    }
});

module.exports = router;