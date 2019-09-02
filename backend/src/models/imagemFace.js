const db = require('../config/db');
const Aluno = require('./aluno');

const ImagemFace = db.sequelize.define('ImagemFaces', {
    IdImagem: {
        autoIncrement: true,
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    Tipo: {
        type: db.Sequelize.STRING
    },
    Descricao: {
        type: db.Sequelize.STRING
    },
    Data: {
        type: db.Sequelize.BLOB('long')
    },
    IsDeleted: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false,
    },

    IdAluno: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Alunos',
            key: 'IdAluno'
        },
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: db.Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: db.Sequelize.DATE
    }
});


//ImagemFace.sync({ force: true });
module.exports = ImagemFace;


