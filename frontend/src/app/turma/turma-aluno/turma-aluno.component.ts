import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';

import { UtilsService } from 'src/app/services/utils.service';
import { TurmaService } from 'src/app/services/turma.service';
import { AlunoService } from 'src/app/services/aluno.service';



@Component({
    selector: 'turma-aluno',
    templateUrl: './turma-aluno.component.html',
    styleUrls: ['./turma-aluno.component.css']
})
export class TurmaAlunoComponent implements OnInit {

    values = [];
    id: any;
    idTurma: any;

    excluir = false;
    turmaFilter = [];
    turma = [];
    alunoTurma = [];
    aluno = [];
    curso = [];
    AlunoCurso = [];
    turmaAluno = [];
    raFilter = [];


    vincular = false;
    addAluno = false;

    turmaAlunos = {
        IdAluno: 0,
        IdTurma: 0,
        Nome: "",
        IsDeleted: 0,
    }

    @Input()
    set vinculo(val) {
        this.turma = val;
        this.vincAluno(val);
        console.log(this.turma);
    }

    @Output() completed = new EventEmitter();

    form: FormGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private service: TurmaService,
        private utils: UtilsService,
        private alunoService: AlunoService,
        private toastr: ToastrService,
    ) {
        this.Initiate(false);
    }

    ngOnInit() {
        this.service.getAllTurmas().subscribe(res => {
            this.turmaFilter = res;
            console.log(this.turmaFilter);
        });

        this.alunoService.getAllAlunos().subscribe(res => {
            this.aluno = res;
            console.log(this.aluno);
        });

    }

    vincAluno(el) {
        if (el.length != 0) {
            for (let i = 0; i < el.length; i++) {
                this.service.getTurmaAluno(this.turma[i].IdTurma).subscribe(res => {
                    this.turmaAluno = res;
                    console.log('Turma', this.turmaAluno);
                });
                this.form.get('IdTurma').setValue(el[i].IdTurma);
                this.turmaAluno.push(el[i]);
            }
        }
    }


    filterNome(e) {
        let raDig = e.target.value;
        console.log(raDig);
        this.raFilter = this.aluno.filter((item) => item.IdAluno == raDig);
        //this.form.get('Nome').setValue(this.raFilter[0].Nome)

    }
    /* filterAlunoCurso(e) {
        this.id = parseInt(e.target.value);
        console.log(this.id);
        this.utils.getTurmaAluno(this.id).subscribe(res => {
            this.AlunoCurso = res;
            console.log(res);
        });
    } */

    ModalAluno() {
        this.addAluno = true;
    }
    cancelAluno() {
        this.addAluno = false;
        this.turmaAlunos = {
            IdAluno: 0,
            IdTurma: 0,
            Nome: "",
            IsDeleted: 0
        };
    }

    voltarBusca(e) {
        console.log(e);
        if (!e) {
            this.completed.emit(e);
            this.Initiate(false);
            return;
        }
    }

    getJSON(obj) {
        for (var prop in this.form.controls) {
            obj[prop] = this.form.controls[prop].value;
        }
        return obj;
    }

    novoAluno() {
        if (this.validateInfos()) {
            this.turmaAlunos = this.getJSON(this.turmaAlunos);
            this.service.turmaAluno(this.turmaAlunos).subscribe(res => {
                this.toastr.success('Sucesso', 'Aluno vinculada com sucesso!');
                this.cancelAluno();
                this.Initiate(false);
            });
        }
    }

    Initiate(edit, callback = null) {
        if (!edit) {
            this.form = this.fb.group({
                IdAluno: new FormControl(0),
                IdTurma: new FormControl(0),
                Nome: new FormControl(null, [Validators.required]),
                IsDeleted: new FormControl(0),
            });
        }
        if (callback) callback();
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

    remover() {
        this.alunoTurma = this.aluno.filter((item) => item.IdAluno = this.id);
        this.service.removeAluno(this.alunoTurma[0]).subscribe(res => {
            console.log(res);
            this.toastr.success('Sucesso', 'Aluno desvinculada com sucesso!');
            this.turmaAluno = this.turmaAluno.filter(e => e.IdAluno != this.id);
            this.excluir = false;
        });
    }

    cancelar() {
        this.id = 0;
        this.excluir = false;
    }

    confirmar(id) {
        console.log(id);
        this.excluir = true;
        this.id = id;
    }

}
