import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  headers = new Headers();

  constructor(
    private http: HttpClient,
  ) {
    this.headers.append("Content-Type", "application/json");
  }

  upload(imagem): Observable<any> {
    return this.http.post('http://localhost:4200/api/upload/uploadfile', imagem);
  }

  getAllDepartamentos(): Observable<any> {
    return this.http.get('http://localhost:4200/api/departamento');
  }

  getAllDisciplinas(): Observable<any> {
    return this.http.get('http://localhost:4200/api/disciplina');
  }

  getCursoDisciplina(id: any): Observable<any> {
    return this.http.get('http://localhost:4200/api/disciplina/buscaCursoDisciplina?IdCurso=' + id);
  }

}

