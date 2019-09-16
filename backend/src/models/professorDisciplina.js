const db = require('../config/db');
const Disciplina = require('../models/disciplina');

ProfessorDisciplina = db.sequelize.define('ProfessorDisciplina', {
    IdProfessorDisciplina: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    IdProfessor: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Professores',
            key: 'IdProfessor'
        },
        allowNull: false
    },
    IdDisciplina: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Disciplinas',
            key: 'IdDisciplina'
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


//Força a criação da tabela
//ProfessorDisciplina.sync({ force: true });
module.exports = ProfessorDisciplina;