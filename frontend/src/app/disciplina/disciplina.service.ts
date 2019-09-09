import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disciplina } from './disciplina.model';
import { Curso } from '../curso/curso.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  disciplinaAddUrl = 'http://localhost:4200/api/disciplina/new';
  disciplinaEditUrl = 'http://localhost:4200/api/disciplina/edit';
  disciplinaBuscaUrl = 'http://localhost:4200/api/disciplina/busca';
  disciplinaBuscaSiglaUrl = 'http://localhost:4200/api/disciplina/buscaSigla';
  disciplinaBuscaIdUrl = 'http://localhost:4200/api/disciplina/buscaId';
  disciplinaRemoveUrl = 'http://localhost:4200/api/disciplina/remove';

  constructor(private http: HttpClient) { }

  fetchDisciplinas() {
    return this.http.get<any>(this.disciplinaBuscaUrl);
  }

  fetchDisciplinaSigla(sigla: string): Observable<any> {
     return (this.http
       .post<any>(this.disciplinaBuscaSiglaUrl,
                 {Sigla: sigla}));
  }

  getDisciplina(index: number) {
    return this.http
      .post<any>(this.disciplinaBuscaIdUrl,
                {IdDisciplina: index});
  }

  addDisciplina(sigla: string, nome:string) {
    return this.http
    .post<any>(this.disciplinaAddUrl,
                {Sigla: sigla,
                 Nome: nome});
  }

  updateDisciplina(sigla: string, nome:string, index: number, disciplina: Disciplina) {
    return this.http
    .put<Disciplina>(this.disciplinaEditUrl,
                {IdDisciplina: disciplina.IdDisciplina,
                 Sigla: sigla,
                 Nome: nome});
  }

  deleteDisciplina(index: number, disciplina: Disciplina) {
    return this.http
      .put<Disciplina>(this.disciplinaRemoveUrl,
                  {IdDisciplina: disciplina.IdDisciplina});
  }

  fetchDisciplinaCurso(indexDisciplina: number) {
    // return this.disciplinasCursosArray[indexDisciplina].slice();
  }

  deleteDisciplinaCurso(indexDisciplina: number, indexCurso: number) {
    // this.disciplinasCursosArray[indexDisciplina].splice(indexCurso, 1);
  }

  addDisciplinaCurso(indexDisciplina: number, curso: Curso) {
    // this.disciplinasCursosArray[indexDisciplina].push(curso);
  }
}
