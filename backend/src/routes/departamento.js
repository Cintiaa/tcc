const express = require('express');
const db = require('../config/db');
const departamentoModel = require('../models/departamento');

const router = express.Router();


//Lista todos os departamentos cadastrados que não foram excluídos (IsDeleted = 0)
router.get('/', (req, res, next) => {
    departamentoModel.findAll({ where: { IsDeleted: 0 } }).then((departamentos) => {
        res.status(200).json(departamentos)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Busca pelo ID do departamento e retorna um array contendo as informações do mesmo para edição
router.get('/id', (req, res, next) => {
    let IdDepartamento = req.query.IdDepartamento;
    departamentoModel.findAll({
        where: {
            IdDepartamento: IdDepartamento,
            IsDeleted: 0
        }
    }).then((departamentos) => {
        res.status(200).json(departamentos)
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

//Retorna os departamentos que coincidem com a Sigla e Nome buscados
router.get('/busca', (req, res) => {
    const Op = db.Sequelize.Op;

    let Sigla = req.query.Sigla;
    let Nome = req.query.Nome;
    if (Sigla == null) {
        Sigla = null;
    }
    if (Nome == null) {
        Nome = null;
    }
    departamentoModel.findAll({
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
    }).then((departamentos) => {

        res.status(200).json(departamentos);
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});

/* POST Departamento */
router.post('/newDepartamento', async (req, res) => {
    let Sigla = req.body.Sigla;
    console.log(Sigla);

    try {
        if (await departamentoModel.findOne({ where: { Sigla: Sigla } })) {
            return res.status(400).json({ error: 'Sigla já cadastrada!' });
        } else {
            const departamento = await departamentoModel.create(req.body);
            console.log(departamento);

            return res.json({ departamento });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Houve um erro. Por favor tente mais tarde!', err });
    }
});

//Remove Departamento da listagem ao setar o IsDeleted com 1 
router.put('/remove', (req, res, next) => {
    let IdDepartamento = req.body.IdDepartamento;
    console.log(IdDepartamento);
    departamentoModel.update(
        { IsDeleted: 1 },
        { where: { IdDepartamento: IdDepartamento } }
    ).then(() => {
        res.status(200).json({ sucess: 'Departamento removido com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na exclusão. Por favor tente mais tarde!', err });
    });
});

//Edita Nome e Curso Departamento
router.put('/edit', (req, res, next) => {
    let IdDepartamento = req.body.IdDepartamento;
    let Nome = req.body.Nome;
    departamentoModel.update(
        { Nome: Nome},
        { where: { IdDepartamento: IdDepartamento } }
    ).then(() => {
        res.status(200).json({ sucess: 'Departamento atualizado com sucesso!' })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na atualização. Por favor tente mais tarde!', err });
    });
});
module.exports = router;
