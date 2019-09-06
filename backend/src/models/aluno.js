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

//Faz a associação de chave estrangeira na tabela de ImagemFace
Aluno.associate = (models) => {
    Aluno.hasMany(models.ImagemFaces, {
        as: 'ImagemFaces',
        foreignKey: 'IdAluno'
    });
}



Aluno.associate = (models) => {
    Aluno.belongsToMany(models.Turmas, {
        through: {
            model: TurmaAlunos,
            unique: false
        },
        as: 'alunos',
        foreignKey: 'IdAluno'
    });
}


//Força a criação da tabela
//Aluno.sync({ force: true });
module.exports = Aluno;


