const Sequelize = require('sequelize');
const secret = require('./secret');

//criação da conexão com o banco de dados SQL Server
//Criar um arquivo secret para receber a senha do usuário
const sequelize = new Sequelize('reconhecimentoFacial', 'sa', secret.DATABASE_PASSWORD, {
    host: 'localhost',
    port: 1433,
    dialect: 'mssql',
    dialectOptions: {
        "options": {
            "port": 1433
            },
        encrypt: true,
        port: 1433
    },
    operatorAliases: false,
    logging: console.log,
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
