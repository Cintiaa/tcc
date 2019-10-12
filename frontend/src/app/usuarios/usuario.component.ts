import { UsuarioService } from './../services/usuario.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';




@Component({
    templateUrl: 'usuario.component.html',
    styleUrls: ['usuario.component.css']
})

export class UsuarioComponent implements OnInit {

    usuario = [];
    cadtrUsuario = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: UsuarioService
    ) { }

    ngOnInit() {
        this.service.buscaUsuario().subscribe((res) => {
            this.usuario = res;
        });
    }

    AdicionarUsuario(e){
        this.cadtrUsuario = e;
    }

    cadastroCallback(e) {
        this.cadtrUsuario = false;
      }
}  