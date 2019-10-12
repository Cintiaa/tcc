const express = require('express');
const jwt = require('jsonwebtoken');
const authConfig = require('./config/auth');
const Usuario = require('./models/usuario');



module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ error: 'Token não fornecido!' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err)
            return res.status(401).json({ error: 'Token inválido!' });

        req.userId = decoded.id; 
        return next(usuario);
    });
}



