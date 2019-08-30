const express = require('express');
const upload = require('../config/upload');
const fs = require('fs');
const Image = require('../models/imagemFace');

const router = express.Router();

//Rota de busca
router.get('/busca', (req, res, next) => {
    Image.findAll().then((image) => {
        res.status(200).json({ image })
    }).catch((err) => {
        res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
    })
});


router.post('/uploadfile', upload.single("file"), (req, res) => {
    Image.create({
        Tipo: req.file.mimetype,
        Descricao: req.file.originalname,
        Data: fs.readFileSync(__basedir + '/resources/static/assets/uploads/' + req.file.filename),
        IsDeleted: 0,
        AlunoIdAluno: req.body.AlunoIdAluno,
    }).then(image => {
        fs.writeFileSync(__basedir + '/resources/static/assets/tmp/' + image.Descricao, image.Data);
        res.status(200).json({ 'message': 'Upload de imagem realizado com sucesso!', 'file': req.file });
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ 'error': 'Falha ao carregar imagem', err });
    })
});

module.exports = router;
