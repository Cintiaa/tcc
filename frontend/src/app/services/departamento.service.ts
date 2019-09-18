import { Disciplina } from './../disciplina/disciplina.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  headers = new Headers();

  constructor(
    private http: HttpClient,
  ) {
    this.headers.append("Content-Type", "application/json");
  }

  getAllDepartamentos(): Observable<any> {
    return this.http.get('http://localhost:4200/api/departamento/');
  }

  listarDepartamentos(busca: any): Observable<any> {
    return this.http.get('http://localhost:4200/api/departamento/busca?Sigla=' + busca["Sigla"] + '&Nome=' + busca["Nome"]);
  }

  cadastrarDepartamento(departamento): Observable<any> {
    return this.http.post('http://localhost:4200/api/departamento/newDepartamento/', departamento);
  }

  buscaDepartamentoId(id: any): Observable<any> {
    return this.http.get('http://localhost:4200/api/departamento/id?IdDepartamento=' + id);
  }

  updateDepartamento(departamento): Observable<any> {
    return this.http.put('http://localhost:4200/api/departamento/edit', departamento);
  }

  removeDepartamento(departamento): Observable<any> {
    return this.http.put('http://localhost:4200/api/departamento/remove/', departamento);
  }

}

