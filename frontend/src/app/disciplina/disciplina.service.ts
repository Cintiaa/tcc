import { Injectable } from '@angular/core';
import { Disciplina } from './disciplina.model';
import { Curso } from '../curso/curso.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  // Salvo aqui por enquanto, mas depois vamos receber essa lista do servidor
  // backend a partir do que estiver armazenado no banco.
  disciplinasArray: Array<Disciplina> = [ new Disciplina('ES31A', 'Introdução A Engenharia De Software'),
                                new Disciplina('ES31B', 'Matemática Discreta'),
                                new Disciplina('ES31C', 'Laboratório De Informática'),
                                new Disciplina('ES31D', 'Algoritmos'),
                                new Disciplina('ES31G', 'Lógica Para Computação')];
  // Primeiro índice diz respeito a Disciplina e segundo índice aos cursos a qual
  // essa disciplina esta vinculada
  // disciplinasCursosArray = [[new Curso(1, 'ES', 'Bacharelado em Engenharia de Software'),
  //                            new Curso(2, 'EC', 'Engenharia da Computação')],
  //                           [],
  //                           [],
  //                           [],
  //                           []];
  disciplinasCursosArray = [];
  
  constructor() { }

  fetchDisciplinas() {
    return this.disciplinasArray.slice();
  }

  getDisciplina(index: number) {
    return this.disciplinasArray[index];
  }

  addDisciplina(disciplina: Disciplina) {
    this.disciplinasArray.push(disciplina);
  }

  updateDisciplina(disciplina: Disciplina, index: number) {
    this.disciplinasArray[index] = disciplina;
  }

  deleteDisciplina(index: number) {
    this.disciplinasArray.splice(index, 1);
  }

  fetchDisciplinaCurso(indexDisciplina: number) {
    return this.disciplinasCursosArray[indexDisciplina].slice();
  }

  deleteDisciplinaCurso(indexDisciplina: number, indexCurso: number) {
    this.disciplinasCursosArray[indexDisciplina].splice(indexCurso, 1);
  }

  addDisciplinaCurso(indexDisciplina: number, curso: Curso) {
    this.disciplinasCursosArray[indexDisciplina].push(curso);
  }
}
