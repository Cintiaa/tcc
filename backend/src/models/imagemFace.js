const db = require('../config/db');
const Aluno = require('./aluno');

const ImagemFace = db.sequelize.define('ImagemFaces', {
    IdImagem: {
        autoIncrement: true,
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    type: {
        type: db.Sequelize.STRING
    },
    TxImagem: {
        type: db.Sequelize.STRING
    },
    Data: {
        type: db.Sequelize.BLOB('long')
    },
    IsDeleted: {
        type: db.Sequelize.BOOLEAN
    },
});

//Faz a associação de chave estrangeira na tabela de ImagemFace
Aluno.hasMany(ImagemFace, {as: 'ImagemFaces'})


//ImagemFace.sync({ force: true });
module.exports = ImagemFace;


