const express = require('express');
const turmaModel = require('../models/turma');
const turmaAluno = require('../models/turmaAluno');

const router = express.Router();

/* GET curso page. */
router.get('/', (req, res, next) => {
    res.render('Turma', { title: 'Turma' });
});

router.get('/', (req, res, next) => {
    res.render('home');
});

//Busca somente os turmas que estão ativos (IsDeleted = 0)
router.get('/busca', (req, res, next) => {
    turmaModel.findAll({where:{ IsDeleted: 0}}).then((turmas) => {
        res.status(200).json({ turmas })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

/* POST Turma */
router.post('/newTurma', async (req, res, next) => {
    try {
        const { alunos, ...data } = req.body;
        const turma = await turmaModel.create(data);

        if (alunos && alunos.length > 0) {
            for (let i = 0; i < alunos.length; i++) {
                turmaAluno.create({
                    IdTurma: turma.IdTurma,
                    IdAluno: alunos[i]
                });
            }
        }
        return res.status(200).json(turma);
    } catch (err) {
        return res.status(400).json({ err });
    }
});

//Remove a Turma da listagem ao setar o IsDeleted com 1 
router.put('/remove', (req, res, next) => {
    turmaModel.update(
        { IsDeleted: 1 },
        { where: { IdTurma: req.body.IdTurma } }
    ).then(() => {
        res.status(200).json({ sucess: 'Turma excluída com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na exclusão. Por favor tente mais tarde!', err });
    });
});

//Edita Nome Turma
//Permitir editar aluno
router.put('/edit', (req, res, next) => {
    turmaModel.update(
        { Nome: req.body.Nome },
        { where: { IdTurma: req.body.IdTurma } }
    ).then(() => {
        res.status(200).json({ sucess: 'Turma atualizada com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});
module.exports = router;
