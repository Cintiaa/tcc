const express = require('express');
const models = require('../models/index');
const discpCurso = require('../models/cursoDisciplina');
const db = require('../config/db');
const router = express.Router();

//Retorna todas as disciplinas para o vinculo com o professor
router.get('/', (req, res, next) => {
    models.Disciplina.findAll({
        where: { IsDeleted: 0 }
    }).then((disciplinas) => {
        res.status(200).json(disciplinas)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Retorna somente as disciplinas que possuem IsDeleted = 0
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
    models.Disciplina.findAll({
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
    }).then((disciplinas) => {
        res.status(200).json(disciplinas)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Retorno do curso com sigla definida.
router.get('/buscaSigla', (req, res, next) => {
    models.Disciplina.findOne({ where: { Sigla: req.body.Sigla, IsDeleted: 0 } }).then((disciplina) => {
        res.status(200).json( disciplina )
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

router.get('/buscaId', (req, res, next) => {
    models.Disciplina.findOne({
        where: { IdDisciplina: req.query.IdDisciplina, IsDeleted: 0 }
    }).then((disciplina) => {
        res.status(200).json(disciplina)
    }).catch(err => {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

// Busca todas as disciplinas de um curso
router.get('/buscaCursoDisciplina', (req, res, next) => {
    const IdCurso = req.query.IdCurso;

    console.log('IdCurso', IdCurso);
    models.Curso.findAll({
        include: [{
            model: models.Disciplina,
            required: true,
            through: {
                where: { IdCurso: req.query.IdCurso, IsDeleted: 0 }
            }
        }]
    }).then((response) => {
        console.log(response);
        disciplinas = response[0] ? response[0].Disciplinas : [];
        res.status(200).json(disciplinas)
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

// Busca todos os cursos de uma disciplina
router.post('/buscaDisciplinaCurso', (req, res, next) => {
    models.Disciplina.findAll({
        include: [{
            model: models.Curso,
            required: true,
            through: {
                where: { IdDisciplina: req.body.IdDisciplina, IsDeleted: 0 }
            }
        }]
    }).then((response) => {
        console.log(response);
        cursos = response[0] ? response[0].Cursos : [];
        res.status(200).json({ cursos })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

// Adiciona nova Disciplina
router.post('/new', (req, res, next) => {
    models.Disciplina.create({
        Sigla: req.body.Sigla.toUpperCase(),
        Nome: req.body.Nome,
        IsDeleted: 0,
    }).then(disciplina => {
        res.status(200).json({ sucess: 'Disciplina cadastrada com sucesso!', disciplina });
        /* res.redirect('/'); */
    }).catch((err) => {
        console.log(err.original.number);
        if (err.original.number === 2627) {
            models.Disciplina.update({
                Nome: req.body.Nome,
                IsDeleted: 0
            }, { where: { Sigla: req.body.Sigla.toUpperCase() } }).then(disciplina => {
                res.status(200).json({ sucess: 'Disciplina cadastrada com sucesso!', disciplina });
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

// Adiciona nova associação de curso e disciplina
router.post('/newCursoDisciplina', async (req, res, next) => {
    /*  models.Curso.findOne({
         where: { IdCurso: req.body.IdCurso, IsDeleted: 0 }
     }).then(curso => {
         console.log(curso);
         models.Disciplina.findOne({
             where: { IdDisciplina: req.body.IdDisciplina, IsDeleted: 0 }
         }).then(disciplina => {
             curso.setDisciplinas(disciplina);
             res.status(200).json({ sucess: 'Curso e Disciplina associados com sucesso!', disciplina });
         }).catch((err) => {
             console.log(err);
             res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
         });
     }).catch((err) => {
         console.log(err);
         res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
     }) */

    try {
        const disciplina = await discpCurso.create(req.body);
        return res.json({ disciplina })
    } catch (err) {
        return res.status(400).json({ err });
    }
});

/* POST Disciplina */
// router.post('/newDisciplina', async (req, res) => {
//     try {
//         const { cursos, ...data } = req.body;
//         const disciplinas = await models.Disciplina.create(data);
//
//         if (cursos && cursos.length > 0) {
//             for (let i = 0; i < cursos.length; i++) {
//                 cursoDisciplina.create({
//                     IdDisciplina: disciplinas.IdDisciplina,
//                     IdCurso: cursos[i]
//                 });
//             }
//             console.log(cursos);
//         }
//         return res.status(200).json(disciplinas);
//     } catch (err) {
//         return res.status(400).json({ err });
//     }
// });

//Remove Disciplina da listagem ao setar o IsDeleted com 1
router.put('/remove', (req, res, next) => {
    models.Disciplina.update({ IsDeleted: 1 }, { where: { IdDisciplina: req.body.IdDisciplina } }).then(() => {
        res.status(200).json({ sucess: 'Disciplina excluído com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na exclusão. Por favor tente mais tarde!', err });
    });
});

// Remove associação de curso e disciplina
router.put('/removeCursoDisciplina', (req, res, next) => {
    /* models.Curso.findOne({
        where: { IdCurso: req.body.IdCurso, IsDeleted: 0 }
    }).then(curso => {
        console.log(curso);
        models.Disciplina.findOne({
            where: { IdDisciplina: req.body.IdDisciplina, IsDeleted: 0 }
        }).then(disciplina => {
            curso.removeDisciplinas(disciplina);
            res.status(200).json({ sucess: 'Curso e Disciplina desassociados com sucesso!', disciplina });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
        });
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
    }) */

    discpCurso.update(
        { IsDeleted: 1 },
        { where: { IdDisciplina: req.body.IdDisciplina } }
    ).then(() => {
        res.status(200).json({ sucess: 'Curso e Disciplina desassociados com sucesso!' })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Edita Nome Disciplina
router.put('/edit', (req, res, next) => {
    models.Disciplina.update({
        Sigla: req.body.Sigla,
        Nome: req.body.Nome
    }, { where: { IdDisciplina: req.body.IdDisciplina } }).then(() => {
        res.status(200).json({ sucess: 'Disciplina atualizado com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});

module.exports = router;