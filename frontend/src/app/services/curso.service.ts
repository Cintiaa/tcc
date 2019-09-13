import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CursoService {

    constructor(
        private http: HttpClient,
    ) { }


    //Retorna todos os Cursos cadastrados
    getAllCurso(): Observable<any> {
        return this.http.get('http://localhost:4200/api/curso/');
    }

}

