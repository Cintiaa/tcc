const db = require('../config/db');
const Aluno = require('./aluno');
const Turma = require('./turma');

const Presenca = db.sequelize.define('Presencas', {
    IdPresenca: {
        autoIncrement: true,
        allowNull: false,
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    QtdPresenca: {
        type: db.Sequelize.INTEGER,
        unique: true,
        allowNull: false,
    },
    DtAula: {
        type: db.Sequelize.DATE,
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
    IdTurma: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Turmas',
            key: 'IdTurma'
        },
        allowNull: false
    },
    IsDeleted: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false,
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

//Faz a associação de chave estrangeira na tabela de Presença
Aluno.associate = (models) => {
    Aluno.hasMany(models.Presencas, { 
        as: 'presencasAluno',
        foreignKey: 'IdAluno'
    });
}

Turma.associate = (models) => {
    Turma.hasMany(models.Presencas, { 
        as: 'presencas',
        foreignKey: 'IdTurma'
     });
}


//Força a criação da tabela
//Presenca.sync({ force: true });
module.exports = Presenca;


