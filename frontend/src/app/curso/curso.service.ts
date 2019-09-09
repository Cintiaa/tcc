import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from './curso.model';
import { Disciplina } from '../disciplina/disciplina.model';



@Injectable({
  providedIn: 'root'
})
export class CursoService {
  cursoAddUrl = 'http://localhost:4200/api/curso/new';
  cursoEditUrl = 'http://localhost:4200/api/curso/edit';
  cursoBuscaUrl = 'http://localhost:4200/api/curso/busca';
  cursoBuscaSiglaUrl = 'http://localhost:4200/api/curso/buscaSigla';
  cursoBuscaIdUrl = 'http://localhost:4200/api/curso/buscaId';
  cursoRemoveUrl = 'http://localhost:4200/api/curso/remove';
  cursoDisciplinaAddUrl = 'http://localhost:4200/api/disciplina/newCursoDisciplina';
  cursoDisciplinaBuscaUrl = 'http://localhost:4200/api/disciplina/buscaCursoDisciplina';
  disciplinaCursoBuscaUrl = 'http://localhost:4200/api/disciplina/buscaDisciplinaCurso';
  cursoDisciplinaRemoveUrl = 'http://localhost:4200/api/disciplina/removeCursoDisciplina';

  constructor(private http: HttpClient) { }

  fetchCursos() {
    return this.http.get<any>(this.cursoBuscaUrl);

  }

  fetchCursoSigla(sigla: string): Observable<any> {
     return this.http
       .post<any>(this.cursoBuscaSiglaUrl,
                 {Sigla: sigla});
  }

  getCurso(index: number) {
    return this.http
      .post<any>(this.cursoBuscaIdUrl,
                {IdCurso: index});
  }

  addCurso(sigla: string, nome:string) {
    return this.http
    .post<any>(this.cursoAddUrl,
                {Sigla: sigla,
                 Nome: nome});
  }

  updateCurso(sigla: string, nome:string, curso: Curso) {
    return this.http
    .put<Curso>(this.cursoEditUrl,
                {IdCurso: curso.IdCurso,
                 Sigla: sigla,
                 Nome: nome});
  }

  deleteCurso(curso: Curso) {
    return this.http
      .put<Curso>(this.cursoRemoveUrl,
                  {IdCurso: curso.IdCurso});
  }

  fetchCursoDisciplina(curso: Curso) {
    return this.http
      .post<any>(this.cursoDisciplinaBuscaUrl,
                {IdCurso: curso.IdCurso});

  }

  fetchDisciplinaCurso(disciplina: Disciplina) {
    return this.http
      .post<any>(this.disciplinaCursoBuscaUrl,
                {IdDisciplina: disciplina.IdDisciplina});
  }

  deleteCursoDisciplina(curso: Curso, disciplina: Disciplina) {
    return this.http
      .post<any>(this.cursoDisciplinaRemoveUrl,
                {IdCurso: curso.IdCurso,
                 IdDisciplina: disciplina.IdDisciplina});
  }

  addCursoDisciplina(curso: Curso, disciplina: Disciplina) {
    return this.http
      .post<any>(this.cursoDisciplinaAddUrl,
                {IdCurso: curso.IdCurso,
                 IdDisciplina: disciplina.IdDisciplina});
  }
}
