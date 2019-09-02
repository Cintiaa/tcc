import { Injectable } from '@angular/core';
import { Curso } from './curso.model';
import { Disciplina } from '../disciplina/disciplina.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  // Salvo aqui por enquanto, mas depois vamos receber essa lista do servidor
  // backend a partir do que estiver armazenado no banco.
  cursosArray: Array<Curso> = [ new Curso('ES', 'Bacharelado em Engenharia de Software'),
                                new Curso('EC', 'Engenharia da Computação'),
                                new Curso('ECA', 'Engenharia de Controle e Automação'),
                                new Curso('EEL', 'Engenharia Elétrica'),
                                new Curso('EELT', 'Engenharia Eletrônica'),
                                new Curso('EM', 'Engenharia Mecânica'),
                                new Curso('LM', 'Licenciatura em Matemática'),
                                new Curso('AS', 'Tecnologia em Análise e Desenvolvimento de Sistemas')];

  // Primeiro índice diz respeito a cursos, que contem disciplinas
  cursosDisciplinasArray = [[new Disciplina('ES31A', 'Introdução A Engenharia De Software'),
                             new Disciplina('ES31B', 'Matemática Discreta'),
                             new Disciplina('ES31C', 'Laboratório De Informática')],
                            [],
                            [],
                            [],
                            [],
                            [],
                            [],
                            []];
  constructor() { }

  fetchCursos() {
    return this.cursosArray.slice();
  }

  getCurso(index: number) {
    return this.cursosArray[index];
  }

  addCurso(curso: Curso) {
    this.cursosArray.push(curso);
  }

  updateCurso(curso: Curso, index: number) {
    this.cursosArray[index] = curso;
  }

  deleteCurso(index: number) {
    this.cursosArray.splice(index, 1);
  }

  fetchCursoDisciplina(indexCurso: number) {
    return this.cursosDisciplinasArray[indexCurso].slice();
  }

  deleteCursoDisciplina(indexCurso: number, indexDisciplina: number) {
    this.cursosDisciplinasArray[indexCurso].splice(indexDisciplina, 1);
  }

  addCursoDisciplina(indexCurso: number, disciplina: Disciplina) {
    this.cursosDisciplinasArray[indexCurso].push(disciplina);
  }
}
