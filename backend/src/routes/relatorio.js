const express = require('express');
const moment = require('moment');
const db = require('../config/db');
const presencaModel = require('../models/presenca');
const models = require('../models/index');

const router = express.Router();

router.get('/', (req, res) => {
    const Op = db.Sequelize.Op;
    let IdTurma = req.query.IdTurma;
    let DtAula = req.query.DtAula;
    console.log('Data', DtAula);

    if (IdTurma == undefined && DtAula == undefined) {
        DtAula = null;
        IdTurma = null;
    }
    if (IdTurma == null) {
        IdTurma = null;
    }
    if (IdTurma == null) {
        IdTurma = null;
    }

    presencaModel.findAll({
        include: [
            {
                model: models.Turma,
                attributes: ['Sigla']
            },
            {
                model: models.Aluno,
                attributes: ['RA', 'Nome']
            },
        ],
        where: {
        IdTurma: IdTurma,
        DtAula: {
            [Op.or]: {
                //[Op.gte]: moment().subtract(7, 'days').toDate(),
                [Op.lt]: new Date(DtAula),
                [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
            }
        },
        IsDeleted: 0
    },
        attributes: ['IdTurma', 'DtAula', 'QtdPresenca']
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