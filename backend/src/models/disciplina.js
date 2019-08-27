const db = require('../config/db');

const Disciplina = db.sequelize.define('Disciplina', {
    IdDisciplina: {
        autoIncrement: true,
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    Sigla: {
        type: db.Sequelize.STRING
    },
    Nome: {
        type: db.Sequelize.STRING
    },
    IsDeleted: {
        type: db.Sequelize.BOOLEAN
    },
});

//Comentar sempre após criar a tabela através do model, para não criar tabela duplicada no banco
//para criar a tabela executar o comando node [nome do model] ex. node disciplina.js
//Disciplina.sync({ force: true });

module.exports = Disciplina;
