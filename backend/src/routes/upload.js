const express = require('express');
const fs = require('fs');
const db = require('../config/db');
const Image = require('../models/imagemFace');
const upload = require('../config/upload');

const router = express.Router();

router.post('/uploadfile', upload.single("uploadfile"), (req, res, next) =>{
    Image.create({
       type: req.file.mimetype,
       TxImagem: req.file.originalname,
       Data: fs.readFileSync(__basedir + 'src/backend/public/uploads' + req.file.filename)
    }).then(imagens =>{
        fs.writeFileSync(__basedir + 'src/backend/public/images/' + imagens.TxImagem, imagens.Data);
        res.status(200).json({'message': 'Upload de imagem realizado com sucesso!', 'file': req.file});
    }).catch((err) => {
        res.status(400).json({'error': 'Falha ao carregar imagem', err});
    })
    
});
module.exports = router;
