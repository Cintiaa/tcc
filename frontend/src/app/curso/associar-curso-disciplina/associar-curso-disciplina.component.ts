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
  disciplinasCursoArray: Array<Disciplina>;
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
            this.curso = this.cursoService.getCurso(this.index);
            this.disciplinasCursoArray = this.cursoService.fetchCursoDisciplina(this.index);
            this.disciplinasAllArray = this.disciplinaService.fetchDisciplinas();
            this.filteredDisciplinas = this.disciplinasAllArray;
          }
      );
  }

  performFilter(filterBy: string): Disciplina[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.disciplinasAllArray.filter((disciplina: Disciplina) =>
              disciplina.sigla.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
              disciplina.nome.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onBuscar() {
    this.performFilter(this.inputBusca);
  }

  onLimparInput() {
    this.inputBusca = '';
  }

  onDeleteDisciplina(indexDisciplina: number) {
    this.cursoService.deleteCursoDisciplina(this.index, indexDisciplina);
    this.disciplinasCursoArray = this.cursoService.fetchCursoDisciplina(this.index);
  }

  onAddDisciplina(indexDisciplina: number) {
    this.cursoService.addCursoDisciplina(this.index, this.filteredDisciplinas[indexDisciplina]);
    this.disciplinasCursoArray = this.cursoService.fetchCursoDisciplina(this.index);
  }

  checkDisciplinaOnList(disciplina: Disciplina) {
    if (this.disciplinasCursoArray.some(data => data.sigla === disciplina.sigla)) {
      return false;
    }
    return true;

  }

}
