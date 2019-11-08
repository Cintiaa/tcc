const db = require('../config/db');

CursoDisciplina = db.sequelize.define('CursoDisciplinas', {
    IdCursoDisciplina: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    IdCurso: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Cursos',
            key: 'IdCurso'
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
    IsDeleted:{
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


//Força a criação da tabel
//CursoDisciplina.sync({ force: true });
module.exports = CursoDisciplina;


