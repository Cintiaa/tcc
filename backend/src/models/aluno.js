const db = require('../config/db');
const Curso = require('./curso');

const Aluno = db.sequelize.define('Alunos', {
    IdAluno: {
        autoIncrement: true,
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    RA: {
        type: db.Sequelize.STRING
    },
    Nome: {
        type: db.Sequelize.STRING
    },
    IsDeleted: {
        type: db.Sequelize.BOOLEAN
    },
});

//Faz a associação de chave estrangeira na tabela de Aluno
Curso.hasMany(Aluno, {as: 'Workers'})


//Aluno.sync({ force: true });
module.exports = Aluno;


