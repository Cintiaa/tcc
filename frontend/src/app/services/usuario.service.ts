import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(
        private http: HttpClient,
    ) { }

    buscaUsuario(): Observable<any> {
        return this.http.get('http://localhost:4200/api/auth/');
    }
    logout(): Observable<any> {
        localStorage.removeItem('access_token');
        return this.http.get('http://localhost:4200/api/auth/logout');
    }

    createUsuario(cadastro): Observable<any> {
        return this.http.post('http://localhost:4200/api/auth/usuario/cadastro', cadastro);
    }

    login(login): Observable<any> {
        return this.http.post<{ token: string }>('http://localhost:4200/api/auth/login', login)
            .pipe(
                map(result => {
                    localStorage.setItem('access_token', result.token);
                    return true;
                })
            );
    }
}

