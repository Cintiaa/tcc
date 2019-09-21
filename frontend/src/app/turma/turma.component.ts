import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { TurmaService } from '../services/turma.service';



@Component({
    templateUrl: 'turma.component.html',
    styleUrls: ['turma.component.css']
})

export class TurmaComponent implements OnInit {
    turma: [];
    turmaEdit: any;
    vinculo: any = [];
    cadtrTurma = false;
    cadtrTurmaAluno = false;
    listaTurma = false;
    msg = false;

    busca = {
        Sigla: "",
        Nome: "",
    }

    limparInput() {
        this.busca = {
            Sigla: "",
            Nome: "",
        }
        this.msg = false;
        this.listaTurma = false;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: TurmaService,
    ) { }

    ngOnInit() {
    }

    buscar() {
        console.log('Busca', this.busca);
        this.service.listarTurmas(this.busca).subscribe(res => {
            this.turma = res;
            console.log(this.turma)
            if (res.length == 0) {
                this.msg = true;
                this.listaTurma = false;
            } else {
                this.msg = false;
                this.listaTurma = true;
            }
        })
    }


    editarTurma(id) {
        console.log(id);
        this.service.buscaTurmaId(id).subscribe(res => {
            this.turmaEdit = res;
            console.log(res);
            this.cadtrTurma = true;
            this.listaTurma = false;
        })
    }

     vincularAluno(id) {
       console.log(id);
       this.service.buscaTurmaId(id).subscribe(res => {
         this.vinculo = res;
         this.cadtrTurmaAluno = true;
         this.listaTurma = false;
       });
     }

    cadastroCallback(e) {
        this.cadtrTurma = false;
        this.cadtrTurmaAluno = false;
        this.msg = false;
    }

    AdicionarTurma(e) {
        this.cadtrTurma = e;
        this.listaTurma = false;
        this.msg = false;
    }
}  