import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  headers = new Headers();

  constructor(
    private http: HttpClient,
  ) {
    this.headers.append("Content-Type", "application/json");
  }


  getAllTurmas(): Observable<any> {
    return this.http.get('http://localhost:4200/api/turma/');
  }

  listarTurmas(busca: any): Observable<any> {
    return this.http.get('http://localhost:4200/api/turma/busca?Sigla=' + busca["Sigla"]);
  }

  cadastrarTurma(turma): Observable<any> {
    return this.http.post('http://localhost:4200/api/turma/newTurma/', turma);
  }

  buscaTurmaId(id: any): Observable<any> {
    return this.http.get('http://localhost:4200/api/turma/id?IdTurma=' + id);
  }

  updateTurma(turma): Observable<any>{
    return this.http.put('http://localhost:4200/api/turma/edit', turma);
  }

  removeTurma(turma): Observable<any>{
    return this.http.put('http://localhost:4200/api/turma/remove/', turma);
  }
  removeAluno(turma): Observable<any>{
    return this.http.put('http://localhost:4200/api/turma/removeAluno/', turma);
  }

  turmaAluno(alunoTurma): Observable<any> {
    return this.http.post('http://localhost:4200/api/turma/turmaAluno/', alunoTurma);
  }

  getTurmaAluno(id: any): Observable<any> {
    return this.http.get('http://localhost:4200/api/turma/buscaTurmaAluno?IdTurma=' + id);
  }

}

