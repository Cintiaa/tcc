const db = require('../config/db');

const Departamento = db.sequelize.define('Departamentos', {
    IdDepartamento: {
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

//Faz uma associação 1:n entre Departamento e Professor 
Departamento.associate = (models) => {
    Departamento.hasMany(Professor, {
        as: 'professores',
        foreignKey: 'IdDepartamento'
    })
    console.log('Associacao feita');
}


//Departamento.sync({force: true});
module.exports = Departamento;
