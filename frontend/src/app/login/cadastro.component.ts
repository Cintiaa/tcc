import { UsuarioService } from './../services/usuario.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'cadastro',
    templateUrl: 'cadastro.component.html',
    styleUrls: ['login.component.css']
})


export class CadastroComponent implements OnInit {
    user = [];
    editando = false;
    logado = false;
    
    cadastrado = false;

    usuario = {
        IdUsuario: 0,
        email: '',
        password: ''
    }

    form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public fb: FormBuilder,
        private service: UsuarioService,
        private toastr: ToastrService
    ) {
        this.Initiate(false);
    }


    @Output() completed = new EventEmitter();

    ngOnInit() {
    }

    getJSON(obj) {
        for (var prop in this.form.controls) {
            obj[prop] = this.form.controls[prop].value;
        }
        return obj;
    }


    cadastrar(a) {
        if (!a) {
            this.completed.emit(a);
            this.Initiate(false);
            return;
        }

        if (this.validateInfos()) {
            this.usuario = this.getJSON(this.usuario);
            this.service.createUsuario(this.usuario).subscribe(res => {
                this.toastr.success('Usuario cadastrado com sucesso!', 'Sucesso', { timeOut: 3000 });
                this.Initiate(false);
                this.cadastrado = true;
            });
        } else {
            this.toastr.error('Preencha todos os campos!', 'Atenção', { timeOut: 3000 });

        }
    }


    setFormErrors(parent) {
        Object.keys(parent.controls).forEach(key => {
            parent.get(key).markAsTouched({ onlySelf: true });
            if ((<any>parent.get(key)).controls) {
                this.setFormErrors(<any>parent.get(key));
            }
        });
    }

    validateInfos() {
        if (this.form.invalid) {
            this.setFormErrors(this.form);
            return false;
        } else {
            return true;
        }
    }


    Initiate(edit, callback = null) {
        if (!edit) {
            this.form = this.fb.group({
                IdUsuario: new FormControl(0),
                email: new FormControl(null, [Validators.required]),
                password: new FormControl(null, [Validators.required]),
            });

        }
        console.log('form', this.form);
        this.editando = edit;
        if (callback) callback();
    }

    validateEmail(e) {
       
    }

    validateSenha(e) {
      
    }

    get email() {
        return this.form.get('email');
    }
    get password() {
        return this.form.get('password');
    }
}

