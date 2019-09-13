import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Curso } from './curso.model';
import { Disciplina } from '../disciplina/disciplina.model';



@Injectable({
  providedIn: 'root'
})
export class CursoService {
  cursoAddUrl = 'http://localhost:4200/api/curso/newCurso';
  cursoEditUrl = 'http://localhost:4200/api/curso/edit';
  cursoBuscaUrl = 'http://localhost:4200/api/curso/';
  // Salvo aqui por enquanto, mas depois vamos receber essa lista do servidor
  // backend a partir do que estiver armazenado no banco.
  private cursosArray: Array<Curso>;
  cursosChanged = new Subject<Curso[]>();

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
  constructor(private http: HttpClient) { }

  fetchCursos() {
    this.http.get<any>(this.cursoBuscaUrl)
      .subscribe(response => {
        this.cursosArray = response.cursos;
        this.cursosChanged.next(this.cursosArray.slice());
    });

    return (this.cursosArray ? this.cursosArray.slice() : []);
  }

  getCurso(index: number) {
    return this.cursosArray[index];
  }

  addCurso(sigla: string, nome:string) {
    this.http
    .post<any>(this.cursoAddUrl,
                {Sigla: sigla,
                 Nome: nome})
      .subscribe(response => {
        console.log(response);
      });
  }

  updateCurso(sigla: string, nome:string, index: number, curso: Curso) {
    this.http
    .put<Curso>(this.cursoEditUrl,
                {IdCurso: curso.IdCurso,
                 Sigla: sigla,
                 Nome: nome})
      .subscribe(response => {
        this.cursosArray[index] = curso;
        this.cursosChanged.next(this.cursosArray.slice());
        console.log(response);
      });


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
