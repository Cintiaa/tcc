const db = require('../config/db');
const Curso = require('./curso');

const Aluno = db.sequelize.define('Alunos', {
    IdAluno: {
        autoIncrement: true,
        allowNull: false,
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    RA: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    Nome: {
        type: db.Sequelize.STRING
    },
    IsDeleted: {
        type: db.Sequelize.BOOLEAN
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

//Faz a associação de chave estrangeira na tabela de Aluno
Curso.hasMany(Aluno, { as: 'Alunos' })


//Força a criação da tabela
//Aluno.sync({ force: true });
module.exports = Aluno;


