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

    listarCursos(busca: any): Observable<any> {
        return this.http.get('http://localhost:4200/api/curso/busca?Sigla=' + busca["Sigla"] + '&Nome=' + busca["Nome"]);
    }

    removeCurso(curso): Observable<any> {
        return this.http.put('http://localhost:4200/api/curso/remove/', curso);
    }

    buscaCursoId(id: any): Observable<any> {
        return this.http.get('http://localhost:4200/api/curso/buscaId?IdCurso=' + id);
    }

    updateCurso(curso): Observable<any> {
        return this.http.put('http://localhost:4200/api/curso/edit', curso);
    }

    cadastrarCurso(curso): Observable<any> {
        return this.http.post('http://localhost:4200/api/curso/new/', curso);
      }

}

