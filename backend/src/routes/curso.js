const express = require('express');
const models = require('../models/index');
const db = require('../config/db');

const router = express.Router();

//Retorna todos os cursos no cadastro de alunos
router.get('/', (req, res, next) => {
    models.Curso.findAll({ where: { IsDeleted: 0 } }).
        then((cursos) => {
            res.status(200).json(cursos);
        }).catch((err) => {
            res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
        })
});


//Retorno somente os cursos que possuem IsDeleted = 0
router.get('/busca', (req, res, next) => {
    const Op = db.Sequelize.Op;
    let Sigla = req.query.Sigla;
    let Nome = req.query.Nome;

    if (Sigla == null) {
        Sigla = null;
    }
    if (Nome == null) {
        Nome = null;
    }

    models.Curso.findAll({
        where: {
            Sigla: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.like]: '%' + Sigla + '%'
                }
            },
            Nome: {
                [Op.or]: {
                    [Op.eq]: null,
                    [Op.like]: '%' + Nome + '%'
                }
            },
            IsDeleted: 0
        }
    }).then((cursos) => {
        res.status(200).json(cursos)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Retorno do curso com sigla definida.
router.get('/buscaSigla', (req, res, next) => {
    models.Curso.findOne({ where: { Sigla: req.body.Sigla, IsDeleted: 0 } }).then((curso) => {
        res.status(200).json( curso )
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

router.get('/buscaId', (req, res, next) => {
    models.Curso.findAll({ where: { IdCurso: req.query.IdCurso, IsDeleted: 0 } }).then((curso) => {
        res.status(200).json( curso )
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

/* POST curso */
router.post('/new', (req, res, next) => {
    models.Curso.create({
        Sigla: req.body.Sigla,
        Nome: req.body.Nome,
        IsDeleted: 0,
    }).then(curso => {
        res.status(200).json({ sucess: 'Curso cadastrado com sucesso!', curso });
        /* res.redirect('/'); */
    }).catch((err) => {
        console.log(err.original.number);
        if (err.original.number === 2627) {
            models.Curso.update({
                Nome: req.body.Nome,
                IsDeleted: 0
            },
                { where: { Sigla: req.body.Sigla } }
            ).then(curso => {
                res.status(200).json({ sucess: 'Curso cadastrado com sucesso!', curso });
                /* res.redirect('/'); */
            }).catch((err2) => {
                console.log(err2);
                res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err2 });
            })
        } else {
            // console.log(err);
            res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
        }
    })
});

//Remove Curso da listagem ao setar o IsDeleted com 1
router.put('/remove', (req, res, next) => {
    models.Curso.update(
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
    models.Curso.update(
        {
            Sigla: req.body.Sigla,
            Nome: req.body.Nome
        },
        { where: { IdCurso: req.body.IdCurso } }
    ).then(() => {
        res.status(200).json({ sucess: 'Curso atualizado com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});

module.exports = router;
