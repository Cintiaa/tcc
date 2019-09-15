import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  headers = new Headers();

  constructor(
    private http: HttpClient,
  ) {
    this.headers.append("Content-Type", "application/json");
  }


  getAllAlunos(): Observable<any> {
    return this.http.get('http://localhost:4200/api/aluno/');
  }

  listarAlunos(busca: any): Observable<any> {
    return this.http.get('http://localhost:4200/api/aluno/busca?RA=' + busca["RA"] + '&Nome=' + busca["Nome"]);
  }

  cadastrarAlunos(aluno): Observable<any> {
    return this.http.post('http://localhost:4200/api/aluno/newAluno/', aluno);
  }

  buscaAlunoId(id: any): Observable<any> {
    return this.http.get('http://localhost:4200/api/aluno/id?IdAluno=' + id);
  }

  updateAluno(aluno): Observable<any>{
    return this.http.put('http://localhost:4200/api/aluno/edit', aluno);
  }

  removeAluno(aluno): Observable<any>{
    return this.http.put('http://localhost:4200/api/aluno/remove/', aluno);
  }


}

