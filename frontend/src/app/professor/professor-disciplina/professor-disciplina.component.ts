import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ProfessorService } from 'src/app/services/professor.service';
import { CursoService } from './../../services/curso.service';
import { UtilsService } from 'src/app/services/utils.service';


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
    professores = [];
    disciplina = [];
    curso = [];
    disciplinaCurso = [];

    vincular = false;
    addDisciplina = false;

    professorDisciplinas = {
        IdDisciplina: 0,
        IdProfessor: 0,
    }

    @Input()
    set vinculo(val) {
        this.professor = val;
        this.vincDisciplina(val);
        console.log(this.professor);
    }

    vincDisciplina(el) {
        if (el.length != 0) {
            this.form.get('IdProfessor').setValue(el[0].IdProfessor);
        }
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
    }

    getJSON(obj) {
        for (var prop in this.form.controls) {
            obj[prop] = this.form.controls[prop].value;
        }
        return obj;
    }

    novaDisciplina(a) {
        if (!a) {
            this.completed.emit(a);
            this.Initiate(false);
            return;
        }
        if (this.validateInfos()) {
            this.professorDisciplinas = this.getJSON(this.professorDisciplinas);

            this.service.professorDisciplina(this.professorDisciplinas).subscribe(res => {
                this.toastr.success('Sucesso', 'Disciplina vinculada com sucesso!', { timeOut: 3000 });
                this.completed.emit(a);
                this.Initiate(false);
            });

        }
    }

    Initiate(edit, callback = null) {
        if (!edit) {
            this.form = this.fb.group({
                IdDisciplina: new FormControl(0),
                IdProfessor: new FormControl(0),
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

    remover() {
        this.professores = this.professorFilter.filter((item) => item.IdProfessor == this.id);
        if (this.professores.length != 0) {
            this.service.removeProfessor(this.professores[0]).subscribe(res => {
                console.log(res);
                this.toastr.success('Sucesso', 'Professor removido com sucesso!');
                this.values = this.values.filter(e => e.IdProfessor != this.id);
                this.excluir = false;
            });
        }
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
