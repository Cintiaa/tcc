const db = require('../config/db');

const Sequelize = require('sequelize');

// Import models
const models = {
  Curso: require('./curso'),
  Disciplina: require('./disciplina'),
  Professor: require('./professor'),
  Aluno: require('./aluno'),
  Turma: require('./turma'),
  ImagemFace: require('./imagemFace'),
  Presenca: require('./presenca'),
  Departamento: require('./departamento')
}

Object.keys(models).forEach(modelKey => {
  // Create model associations
  if ('associate' in models[modelKey]) {
    models[modelKey].associate(models)
  }
})



//db.sequelize.sync();
module.exports = models;
