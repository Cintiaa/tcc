const db = require('../config/db');
const ImagemFace = require('./imagemFace');

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
    IdCurso: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Cursos',
            key: 'IdCurso'
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

Aluno.associate = (models) => {
    Aluno.belongsToMany(models.Turma, {
        through: {
            model: 'TurmaAlunos',
            unique: false
        },
        foreignKey: 'IdAluno'
    });

    Aluno.hasMany(models.ImagemFace, {
        foreignKey: 'IdAluno'
    });

    Aluno.hasMany(models.Presenca, { 
        foreignKey: 'IdAluno'
    });

    Aluno.belongsTo(models.Curso, {
        foreignKey: 'IdCurso'
    });
}


//Força a criação da tabela
//Aluno.sync({ force: true });
module.exports = Aluno;


