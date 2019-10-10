const express = require('express');
const moment = require('moment');
const db = require('../config/db');
const presencaModel = require('../models/presenca');
const models = require('../models/index');

const router = express.Router();

//Consulta Bruta para gerar o relatório
router.get('/', (req, res) => {
    let IdTurma = req.query.IdTurma;
    let DtAula = req.query.DtAula;
    db.sequelize.query(`SELECT t.Sigla, a.RA, a.Nome, p.QtdPresenca, FORMAT(p.DtAula, 'dd/MM/yyyy', 'en-US' ) as DtAula FROM Presencas p ` +
        ` JOIN Alunos a ON p.IdAluno = a.IdAluno ` +
        ` JOIN Turmas t ON t.IdTurma = p.IdTurma WHERE t.IdTurma = '${IdTurma}' AND p.DtAula like '%${DtAula}%'`,
        { type: db.Sequelize.QueryTypes.SELECT }
    ).then(results => {
        res.status(200).json(results);
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro na execução da busca', err });
    });
});


router.post('/newPresenca', async (req, res) => {
    try {
        const presenca = await presencaModel.create({
            QtdPresenca: req.body.QtdPresenca,
            DtAula: moment().format('YYYY-MM-DD'),
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