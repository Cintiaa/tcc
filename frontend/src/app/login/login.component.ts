import { UsuarioService } from './../services/usuario.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})


export class LoginComponent implements OnInit {
    form: FormGroup;
    logado = false;
    isEmail = false;
    isSenha = false;
    vazio = false;
    cad = false;
    emailFilter = [];
    senhaFilter = [];
    usuario = [];

    login = {
        email: '',
        password: ''
    }

    @Output() logout = new EventEmitter();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public fb: FormBuilder,
        private service: UsuarioService
    ) { }

    ngOnInit() {
        this.logado = false;

        this.service.buscaUsuario().subscribe((res) => {
            this.usuario = res;
        });

        this.form = this.fb.group({
            email: this.fb.control(null, [Validators.required, Validators.email, Validators.pattern("[^ @]*@[^ @]*")]),
            password: this.fb.control(null, [Validators.required, Validators.minLength(8)])
        });
    }

    /*  deslogar(e) {
         console.log(e);
         this.logout.emit(e);
         this.logado = false;
     } */

    getJSON(obj) {
        for (var prop in this.form.controls) {
            obj[prop] = this.form.controls[prop].value;
        }
        return obj;
    }

    cadastro(e) {
        console.log(e);
        this.cad = true;
        this.router.navigate(['cadastro'], { relativeTo: this.route });
    }

    fazerLogin() {
        this.logado = false;
        if (!this.validateEmail(this.form.get('email').value)) {
            return;
        } else if (!this.validateSenha(this.form.get('password').value)) {
            return;
        } else {
            this.login = this.getJSON(this.login);
            this.service.login(this.login)
                .pipe(first())
                .subscribe((res) => {
                    this.logado = true;
                    this.router.navigate(['home'], { relativeTo: this.route });
                });
            this.logado = false;
        }
    }

    validateEmail(e) {
        let email = e;
        console.log(email)
        this.emailFilter = this.usuario.filter((el) => el.email == email);
        if (this.emailFilter.length == 0) {
            console.log(this.emailFilter);
            this.isEmail = true;
            return false;
        } else {
            this.isEmail = false;
            return true;
        }
    }

    validateSenha(e) {
        let senha = e;
        this.senhaFilter = this.usuario.filter((el) => el.password == senha);
        if (this.senhaFilter.length == 0) {
            console.log(this.senhaFilter);
            this.isSenha = true;
            return false;
        } else {
            this.isSenha = false;
            return true;
        }
    }

    get email() {
        return this.form.get('email');
    }
    get password() {
        return this.form.get('password');
    }
}

