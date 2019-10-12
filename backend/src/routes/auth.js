const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const authConfig = require('../config/auth');


const router = express.Router();

router.get('/', (req, res) => {
    Usuario.findAll()
        .then((usuarios) => {
            res.status(200).json(usuarios);
        }).catch((err) => {
            res.status(400).json({ error: 'Houve um erro na execução da busca!', err });
        })
});

router.post('/usuario/cadastro', async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try {
        if (await Usuario.findOne({ where: { email: email } }))
            return res.status(400).json({ error: 'E-mail já cadastrado!' });

        const usuario = await Usuario.create(req.body, (err, usuario) => {
            const token = jwt.sign({ id: usuario.IdUsuario }, authConfig.secret, {
                expiresIn: 86400 // expira em 24 hrs
            });
            res.status(200).send({ auth: true, token: token })
        });
        return res.json(usuario);


    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Falha na tentativa de cadastro, tente novamente!' });
    }
});


router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password)

    try {

        const usuario = await Usuario.findOne({ email });
        if (!usuario)
            return res.status(400).json({ error: 'Usuário não existe!' });


        if (!await bcrypt.compare(password, usuario.password_hash))
            return res.status(400).json({ error: 'Senha Inválida!' });


        //Criando token de autenticação
        const token = jwt.sign({ id: usuario.IdUsuario }, authConfig.secret, {
            expiresIn: 86400 // expira em 24 hrs,
        })
        res.json({ sucess: 'Usuário logado!', usuario, auth: true, token });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Falha na tentativa de login, tente novamente!' });
    }

});

router.get('/logout', function (req, res, next) {
    res.status(200).send({ auth: false, token: null });
    req.logOut();
    res.redirect('/');
});

//CADASTRO PROVISÓRIO
router.post('/cadastro', async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try {
        if (await Usuario.findOne({ where: { email: email } }))
            return res.status(400).json({ error: 'E-mail já cadastrado!' });

        const usuario = await Usuario.create(req.body, (err, usuario) => {
            const token = jwt.sign({ id: usuario.IdUsuario }, authConfig.secret, {
                expiresIn: 86400 // expira em 24 hrs
            });
            res.status(200).send({ auth: true, token: token })
        });
        return res.json(usuario);


    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Falha na tentativa de cadastro, tente novamente!' });
    }
});

module.exports = router;