const Sequelize = require('sequelize');

//criação da conexão com o banco de dados SQL Server
//database: reconhecimentoFacial, user: sa, password: teste123
const sequelize = new Sequelize('reconhecimentoFacial', 'sa', 'teste123', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        encrypt: true
    },
    operatorAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        //console.log(sequelize);
        console.log('Conexão realizada com sucesso!!');
    })
    .catch(err => {
        console.log('Falha ao tentar se conectar com o banco de dados: ', err);
    });



module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}