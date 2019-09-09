import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CursoService } from '../curso.service';
import { Curso } from '../curso.model';
import { Disciplina } from '../../disciplina/disciplina.model';
import { DisciplinaService } from '../../disciplina/disciplina.service';


@Component({
  selector: 'app-associar-curso-disciplina',
  templateUrl: './associar-curso-disciplina.component.html',
  styleUrls: ['../curso.css']
})
export class AssociarCursoDisciplinaComponent implements OnInit {
  index: number;
  curso: Curso;
  disciplinasCursoArray: Array<Disciplina> = [];
  disciplinasAllArray: Array<Disciplina> = [];
  filteredDisciplinas: Array<Disciplina> = [];

  _inputBusca: string;
  get inputBusca(): string {
      return this._inputBusca;
  }
  set inputBusca(value: string) {
      this._inputBusca = value;
      this.filteredDisciplinas = this.inputBusca ? this.performFilter(this.inputBusca) : this.disciplinasAllArray;
  }

  constructor(private cursoService: CursoService,
              private disciplinaService: DisciplinaService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
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
              });
            this.disciplinaService.fetchDisciplinas()
              .subscribe(response => {
                this.disciplinasAllArray = response.disciplinas;
                this.filteredDisciplinas = this.disciplinasAllArray;
              });
          }
      );
  }

  performFilter(filterBy: string): Disciplina[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.disciplinasAllArray.filter((disciplina: Disciplina) =>
              disciplina.Sigla.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
              disciplina.Nome.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onBuscar() {
    this.performFilter(this.inputBusca);
  }

  onLimparInput() {
    this.inputBusca = '';
  }

  onDeleteDisciplina(indexDisciplina: number) {
    this.cursoService.deleteCursoDisciplina(this.curso, this.disciplinasCursoArray[indexDisciplina])
    .subscribe(response => {
      this.disciplinasCursoArray.splice(indexDisciplina,1);
      console.log(response);
    });
  }

  onAddDisciplina(indexDisciplina: number) {
    this.cursoService.addCursoDisciplina(this.curso, this.filteredDisciplinas[indexDisciplina])
      .subscribe(response => {
        this.disciplinasCursoArray.push(this.filteredDisciplinas[indexDisciplina]);
        console.log(response);
      });
  }

  checkDisciplinaOnList(disciplina: Disciplina) {
    if (this.disciplinasCursoArray.some(data => data.Sigla === disciplina.Sigla)) {
      return false;
    }
    return true;

  }

}
