import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { TurmaService } from 'src/app/services/turma.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
    selector: 'turma-cadastro',
    templateUrl: 'turma-cadastro.component.html',
    styleUrls: ['turma-cadastro.component.css']
})

export class TurmaCadastroComponent implements OnInit {
    editando = false;
    disciplina = [];

    turma = {
        IdTurma: 0,
        Sigla: "",
        IdDisciplina: "",
        IsDeleted: 0,
    }

    form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public fb: FormBuilder,
        private service: TurmaService,
        private utils: UtilsService,
        private toastr: ToastrService
    ) {
        this.Initiate(false);
    }


    @Input()
    set turmaEdit(val) {
        if (val) {
            this.editTurma(val);
            this.editando = true;
        }
    }

    @Output() completed = new EventEmitter();

    ngOnInit() {
        this.utils.getAllDisciplinas().subscribe(res => {
            this.disciplina = res;
        });
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
            this.turma = this.getJSON(this.turma);
            if (!this.editando) {
                this.service.cadastrarTurma(this.turma).subscribe(res => {
                    this.toastr.success('Sucesso', 'Turma cadastrado com sucesso!', {
                        timeOut: 3000
                    });
                    this.completed.emit(a);
                    this.Initiate(false);

                });
            }
            if (this.editando) {
                this.service.updateTurma(this.turma).subscribe(res => {
                    this.toastr.success('Sucesso', 'Turma atualizado com sucesso!', { timeOut: 3000 });
                    this.completed.emit(a);
                    this.Initiate(false);
                });
            }

        } else {
            this.toastr.error('Atenção', 'Preencha todos os campos!', {
                timeOut: 3000
            });
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

    editTurma(el) {
        this.Initiate(true, () => {
            this.form.get('IdTurma').setValue(el[0].IdTurma);
            this.form.get('Sigla').setValue(el[0].Sigla);
            this.form.get('IdDisciplina').setValue(el[0].IdDisciplina);
            this.form.get('IsDeleted').setValue(el[0].IsDeleted);
        });
    }

    Initiate(edit, callback = null) {
        if (!edit) {
            this.form = this.fb.group({
                IdTurma: new FormControl(0),
                Sigla: new FormControl(null, [Validators.required]),//salvar todas as siglas em maiúsculo
                IdDisciplina: new FormControl(null, [Validators.required]),
                IsDeleted: new FormControl(0),
            });

        }
        console.log('form', this.form);
        this.editando = edit;
        if (callback) callback();
    }

}
