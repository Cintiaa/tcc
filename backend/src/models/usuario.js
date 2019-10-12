const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = db.sequelize.define('Usuarios', {
    IdUsuario: {
        autoIncrement: true,
        allowNull: false,
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    email: {
        type: db.Sequelize.STRING,
    },
    password: {
        type: db.Sequelize.STRING,
    },
    password_hash: {
        type: db.Sequelize.STRING,
    },

    createdAt: {
        allowNull: false,
        type: db.Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: db.Sequelize.DATE
    },
}, {
    hooks: {
        beforeSave: async usuario => {
            if (usuario.password) {
                usuario.password_hash = await bcrypt.hash(usuario.password, 8)
            }
        }
    }
});

Usuario.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
}



//Força a criação da tabela
//Usuario.sync({ force: true });
module.exports = Usuario;


