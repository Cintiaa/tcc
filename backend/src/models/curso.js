const db = require('../config/db');

const Curso = db.sequelize.define('Cursos', {
    IdCurso: {
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


//Curso.sync({force: true});
module.exports = Curso;


