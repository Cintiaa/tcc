import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Curso } from '../curso.model';
import { Disciplina } from '../../disciplina/disciplina.model';

import { CursoService } from 'src/app/services/curso.service';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'associar-curso-disciplina',
  templateUrl: './associar-curso-disciplina.component.html',
  styleUrls: ['../curso.css']
})
export class AssociarCursoDisciplinaComponent implements OnInit {

  public paginaAtual = 1;
  
  index: number;
  curso = [];
  disciplinasCursoArray = [];
  disciplinasAllArray = [];
  filteredDisciplinas = [];
  cursos = [];
  cursoDisciplina = [];

  id: any;
  idCurso: any;
  addDisciplina = false;
  excluir = false;

  cursoDisciplinas = {
    IdDisciplina: null,
    IdCurso: null,
    IsDeleted: 0,
  }


  /*  _inputBusca: string;
   get inputBusca(): string {
     return this._inputBusca;
   }
   set inputBusca(value: string) {
     this._inputBusca = value;
     this.filteredDisciplinas = this.inputBusca ? this.performFilter(this.inputBusca) : this.disciplinasAllArray;
   } */

  @Input()
  set vinculo(val) {
    this.cursos = val;
    this.vincDisciplina(val);
    console.log(this.cursos);
  }

  @Output() completed = new EventEmitter();


  form: FormGroup;

  constructor(
    private cursoService: CursoService,
    private disciplinaService: DisciplinaService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.Initiate(false);
  }

  ngOnInit() {
    /* this.route.params
      .subscribe(
        (params: Params) => {
          this.index = params['index'];
          this.cursoService.getCurso(this.index)
            .subscribe(response => {
              this.curso = response.curso;
              this.cursoService.fetchCursoDisciplina(this.curso)
                .subscribe(response => {
                  console.log(response);
                  this.disciplinasCursoArray = response.disciplinas;
                  console.log(this.disciplinasCursoArray);
                })
            }); */
    this.cursoService.getAllCurso().subscribe(res => {
      this.curso = res;
      console.log(res);
    });

    this.disciplinaService.getAllDisciplinas().subscribe(response => {
      this.disciplinasAllArray = response;
      console.log(this.disciplinasAllArray)
      //this.filteredDisciplinas = this.disciplinasAllArray;
    });
  }
  /*     );
  } */

  vincDisciplina(el) {
    if (el.length != 0) {
      for (let i = 0; i < el.length; i++) {
        this.disciplinaService.getCursoDisciplinas(this.cursos[i].IdCurso).subscribe(res => {
          this.cursoDisciplina = res;
          console.log(this.cursoDisciplina);
        });
      }
      this.form.get('IdCurso').setValue(el[0].IdCurso);
    }
  }

  Initiate(edit, callback = null) {
    if (!edit) {
      this.form = this.fb.group({
        IdDisciplina: new FormControl(0),
        IdCurso: new FormControl(0),
        IsDeleted: new FormControl(0),
      });
    }
    if (callback) callback();
  }

  ModalDisciplina() {
    this.addDisciplina = true;
    this.vincDisciplina(this.cursos);
    this.clear();
  }
  cancelDisciplina() {
    this.addDisciplina = false;
    this.clear();
  }

  clear() {
    this.cursoDisciplinas = {
      IdDisciplina: null,
      IdCurso: null,
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

  onAddDisciplina() {
    if (this.validateInfos()) {
      this.cursoDisciplinas = this.getJSON(this.cursoDisciplinas);
      this.disciplinaService.addCursoDisciplina(this.cursoDisciplinas).subscribe(response => {
        this.toastr.success('Sucesso', 'Disciplina vinculada com sucesso!');
        this.Initiate(false);
        this.cancelDisciplina();
        console.log(response);
      });
      this.vincDisciplina(this.cursos);
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

  onDeleteDisciplina() {
    this.filteredDisciplinas = this.disciplinasAllArray.filter((e) => e.IdDisciplina == this.id);
    this.disciplinaService.deleteCursoDisciplina(this.filteredDisciplinas[0]).subscribe(response => {
      this.toastr.success('Sucesso', 'Disciplina desvinculada com sucesso!');
      this.cursoDisciplina = this.cursoDisciplina.filter(e => e.IdDisciplina != this.id);
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

  /* performFilter(e): Disciplina[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.disciplinasAllArray.filter((disciplina: Disciplina) =>
      disciplina.Sigla.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      disciplina.Nome.toLocaleLowerCase().indexOf(filterBy) !== -1);
  } */

  /*  onBuscar() {
     this.performFilter(this.inputBusca);
   }
 
   onLimparInput() {
     this.inputBusca = '';
   }
  */
  /*   onDeleteDisciplina(indexDisciplina: number) {
      this.cursoService.deleteCursoDisciplina(this.curso, this.disciplinasCursoArray[indexDisciplina])
        .subscribe(response => {
          this.disciplinasCursoArray.splice(indexDisciplina, 1);
          console.log(response);
        });
    }
  
   
    checkDisciplinaOnList(disciplina: Disciplina) {
      if (this.disciplinasCursoArray.some(data => data.Sigla === disciplina.Sigla)) {
        return false;
      }
      return true;
  
    } */

}
