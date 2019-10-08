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
        allowNull: false,
        unique: false,
    },
    DtAula: {
        type: db.Sequelize.DATE,
        allowNull: false,
        unique: false,
    },
    IdAluno: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Alunos',
            key: 'IdAluno'
        },
        allowNull: false,
        unique: false,
    },
    IdTurma: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Turmas',
            key: 'IdTurma'
        },
        allowNull: false, 
        unique: false,
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

Presenca.associate = (models) => {
    Presenca.belongsTo(models.Turma, {
        foreignKey: 'IdTurma'
    });
    Presenca.belongsTo(models.Aluno, {
        foreignKey: 'IdAluno'
    });
}
//Força a criação da tabela
//Presenca.sync({ force: true });
module.exports = Presenca;


