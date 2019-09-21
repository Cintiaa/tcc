const db = require('../config/db');

TurmaAluno = db.sequelize.define('TurmaAluno', {
    IdTurmaAluno: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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


//Força a criação da tabela
//TurmaAluno.sync({ force: true });
module.exports = TurmaAluno;


