const db = require('../config/db');

const Professor = db.sequelize.define('Professores', {
    IdProfessor: {
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
    IdDepartamento: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Departamentos',
            key: 'IdDepartamento'
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


//Faz a associação n:m entre Professor e Disciplina
Professor.associate = (models) => {
    Professor.belongsToMany(models.Disciplina, {
        through:{
            model: 'ProfessorDisciplinas',
            unique: false,
        },
        foreignKey: 'IdProfessor'
    });
}

//Professor.sync({ force: true });
module.exports = Professor;


