const db = require('../config/db');
const CursoDisciplina = require('./cursoDisciplina');
const Disciplina = require('./disciplina');

const Curso = db.sequelize.define('Cursos', {
    IdCurso: {
        autoIncrement: true,
        allowNull: false,
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    Sigla: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    Nome: {
        type: db.Sequelize.STRING
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

//Faz uma associação 1:n entre Curso e Aluno
Curso.associate = (Aluno) => {
    Curso.hasMany(Aluno, {
        as: 'alunos',
        foreignKey: 'IdCurso'
    })
}


//Faz a associação n:m entre Curso e Disciplina
Curso.associate = (models) => {
    Curso.belongsToMany(models.Disciplinas, {
        through: {
            model: CursoDisciplina,
            unique: false
        },
        as: 'cursos',
        foreignKey: 'IdCurso'
    });
}


//Curso.sync({force: true});
module.exports = Curso;


