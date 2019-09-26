import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ProfessorService } from 'src/app/services/professor.service';
import { CursoService } from './../../services/curso.service';
import { UtilsService } from 'src/app/services/utils.service';
import { isNgTemplate } from '@angular/compiler';


@Component({
    selector: 'professor-disciplina',
    templateUrl: './professor-disciplina.component.html',
    styleUrls: ['./professor-disciplina.component.css']
})
export class ProfessorDisciplinaComponent implements OnInit {

    values = [];
    id: any;
    idProfessor: any;

    excluir = false;
    professorFilter = [];
    professor = [];
    discipProf = [];
    disciplina = [];
    curso = [];
    disciplinaCurso = [];
    profDisciplina = [];
    cursoFiltter = [];

    vincular = false;
    addDisciplina = false;

    professorDisciplinas = {
        IdDisciplina: null,
        IdProfessor: null,
        IsDeleted: 0,
    }

    @Input()
    set vinculo(val) {
        this.professor = val;
        this.vincDisciplina(val);
        console.log(this.professor);
    }

    @Output() completed = new EventEmitter();

    form: FormGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private service: ProfessorService,
        private utils: UtilsService,
        private cursoService: CursoService,
        private toastr: ToastrService,
    ) {
        this.Initiate(false);
    }

    ngOnInit() {
        this.service.getAllProfessores().subscribe(res => {
            this.professorFilter = res;
        });

        this.utils.getAllDisciplinas().subscribe(res => {
            this.disciplina = res;
            console.log(this.disciplina);
        });

        this.cursoService.getAllCurso().subscribe(res => {
            this.curso = res;
            console.log(res);
        });

    }

    vincDisciplina(el) {
        if (el.length != 0) {
            for (let i = 0; i < el.length; i++) {
                this.service.getProfessorDisciplina(this.professor[i].IdProfessor).subscribe(res => {
                    this.profDisciplina = res;
                    console.log(this.profDisciplina);
                });
            }
            this.form.get('IdProfessor').setValue(el[0].IdProfessor);

        }
    }


    filterDisciplinaCurso(e) {
        this.id = parseInt(e.target.value);
        console.log(this.id);
        this.utils.getCursoDisciplina(this.id).subscribe(res => {
            this.disciplinaCurso = res;
            console.log(res);
        });
    }
    ModalDisciplina() {
        this.addDisciplina = true;
        this.vincDisciplina(this.professor);
        this.clear();
    }
    cancelDisciplina() {
        this.addDisciplina = false;
        this.clear();
    }

    clear() {
        this.professorDisciplinas = {
            IdDisciplina: null,
            IdProfessor: null,
            IsDeleted: 0
        };
    }
    voltarBusca(e) {
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

    novaDisciplina() {
        if (this.validateInfos()) {
            this.professorDisciplinas = this.getJSON(this.professorDisciplinas);
            this.service.professorDisciplina(this.professorDisciplinas).subscribe(res => {
                this.toastr.success('Sucesso', 'Disciplina vinculada com sucesso!');
                this.Initiate(false);
                this.cancelDisciplina();
            });
            this.vincDisciplina(this.professor);
        }
    }

    Initiate(edit, callback = null) {
        if (!edit) {
            this.form = this.fb.group({
                IdDisciplina: new FormControl(0),
                IdProfessor: new FormControl(0),
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
        this.discipProf = this.disciplina.filter((item) => item.IdDisciplina = this.id);
        this.service.removeDisciplina(this.discipProf[0]).subscribe(res => {
            console.log(res);
            this.toastr.success('Sucesso', 'Disciplina desvinculada com sucesso!');
            this.profDisciplina = this.profDisciplina.filter(e => e.IdDisciplina != this.id);
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
