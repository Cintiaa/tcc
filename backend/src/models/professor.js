const db = require('../config/db');

const Professor = db.sequelize.define('Professores', {
    IdProfessor: {
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

//Professor.sync({ force: true });
module.exports = Professor;


