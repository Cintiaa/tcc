const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//const db = require('./config/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cursoRouter = require('./routes/curso');
const alunoRouter = require('./routes/aluno');
const disciplinaRouter = require('./routes/disciplina');
const professorRouter = require('./routes/professor');
const imagemRouter = require('./routes/upload');
const turmaRouter = require('./routes/turma');
const departamentoRouter = require('./routes/departamento');
const relatorioRouter = require('./routes/relatorio');


const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }

})

global.__basedir = __dirname;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './resources')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/curso', cursoRouter);
app.use('/api/aluno', alunoRouter);
app.use('/api/disciplina', disciplinaRouter);
app.use('/api/professor', professorRouter);
app.use('/api/upload', imagemRouter);
app.use('/api/turma', turmaRouter);
app.use('/api/departamento', departamentoRouter);
app.use('/api/relatorio', relatorioRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
