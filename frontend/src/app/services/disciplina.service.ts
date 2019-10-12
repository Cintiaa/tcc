import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class DisciplinaService {

    constructor(
        private http: HttpClient,
    ) { }


    //Retorna todas as Disciplinas cadastradas
    getAllDisciplinas(): Observable<any> {
        return this.http.get('http://localhost:4200/api/disciplina');
    }

    getCursoDisciplinas(id: any): Observable<any> {
        return this.http.get('http://localhost:4200/api/disciplina/buscaCursoDisciplina?IdCurso=' + id);
    }

    addCursoDisciplina(disciplina): Observable<any> {
        return this.http.post('http://localhost:4200/api/disciplina/newCursoDisciplina', disciplina);
    }

    deleteCursoDisciplina(disciplina): Observable<any> {
        return this.http.put('http://localhost:4200/api/disciplina/removeCursoDisciplina', disciplina);
    }

    buscaDisciplinaId(id: any): Observable<any> {
        return this.http.get('http://localhost:4200/api/disciplina/buscaId?IdDisciplina=' + id);
    }

    listarDisciplinas(busca: any): Observable<any> {
        return this.http.get('http://localhost:4200/api/disciplina/busca?Sigla=' + busca["Sigla"] + '&Nome=' + busca["Nome"]);
    }

    removeDisciplina(disciplina): Observable<any> {
        return this.http.put('http://localhost:4200/api/disciplina/remove', disciplina);
    }

    cadastrarDisciplina(disciplina): Observable<any> {
        return this.http.post('http://localhost:4200/api/disciplina/new', disciplina);
    }

    updateDisciplina(disciplina): Observable<any> {
        return this.http.put('http://localhost:4200/api/disciplina/edit', disciplina);
    }
}

