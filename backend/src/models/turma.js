const db = require('../config/db');
const Disciplina = require('./disciplina');


const Turma = db.sequelize.define('Turma', {
    IdTurma: {
        autoIncrement: true,
        allowNull: false,
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    Sigla: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false,
        upperCase: true,
    },
    IdDisciplina: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Disciplinas',
            key: 'IdDisciplina'
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

Turma.associate = (models) => {
    Turma.belongsToMany(models.Aluno, {
        through: {
            model: 'TurmaAluno',
            unique: false
        },
        foreignKey: 'IdTurma'
    });

    Turma.hasMany(models.Presenca, { 
        foreignKey: 'IdTurma'
     });

     Turma.belongsTo(models.Disciplina, {
        foreignKey: 'IdDisciplina'
    });
}

//Comentar sempre após criar a tabela através do model, para não criar tabela duplicada no banco
//para criar a tabela executar o comando node [nome do model] ex. node turma.js
//Turma.sync({ force: true });


module.exports = Turma;