import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  headers = new Headers();

  constructor(
    private http: HttpClient,
  ) {
    this.headers.append("Content-Type", "application/json");
  }


  getAllProfessores(): Observable<any> {
    return this.http.get('http://localhost:4200/api/professor/');
  }

  listarProfessores(busca: any): Observable<any> {
    return this.http.get('http://localhost:4200/api/professor/busca?Nome=' + busca["Nome"]);
  }

  cadastrarProfessor(professor): Observable<any> {
    return this.http.post('http://localhost:4200/api/professor/newProfessor/', professor);
  }

  buscaProfessorId(id: any): Observable<any> {
    return this.http.get('http://localhost:4200/api/professor/id?IdProfessor=' + id);
  }

  updateProfessor(professor): Observable<any>{
    return this.http.put('http://localhost:4200/api/professor/edit', professor);
  }

  removeProfessor(professor): Observable<any>{
    return this.http.put('http://localhost:4200/api/professor/remove/', professor);
  }

  professorDisciplina(disciplinaProfessor): Observable<any>{
    return this.http.post('http://localhost:4200/api/professor/professorDisciplina/', disciplinaProfessor);
  }


}

