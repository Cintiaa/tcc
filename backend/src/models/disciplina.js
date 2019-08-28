const db = require('../config/db');
const Curso = require('./curso');

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

//Faz a associação de chave estrangeira na tabela de Disciplina
Curso.hasMany(Disciplina, {as: 'Disciplinas'})

//Comentar sempre após criar a tabela através do model, para não criar tabela duplicada no banco
//para criar a tabela executar o comando node [nome do model] ex. node disciplina.js
//Disciplina.sync({ force: true });


module.exports = Disciplina;
