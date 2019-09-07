import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CursoService } from '../../curso/curso.service';
import { Curso } from '../../curso/curso.model';
import { Disciplina } from '../disciplina.model';
import { DisciplinaService } from '../disciplina.service';


@Component({
  selector: 'app-associar-disciplina-curso',
  templateUrl: './associar-disciplina-curso.component.html',
  styleUrls: ['../disciplina.css']
})
export class AssociarDisciplinaCursoComponent implements OnInit {
  index: number;
  disciplina: Disciplina;
  cursosDisciplinaArray: Array<Curso>;
  cursosAllArray: Array<Curso> = [];
  filteredCursos: Array<Curso> = [];

  _inputBusca: string;
  get inputBusca(): string {
      return this._inputBusca;
  }
  set inputBusca(value: string) {
      this._inputBusca = value;
      this.filteredCursos = this.inputBusca ? this.performFilter(this.inputBusca) : this.cursosAllArray;
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
            this.disciplina = this.disciplinaService.getDisciplina(this.index);
            this.cursosDisciplinaArray = this.disciplinaService.fetchDisciplinaCurso(this.index);
            this.cursosAllArray = this.cursoService.fetchCursos();
            this.filteredCursos = this.cursosAllArray;
          }
      );
  }

  performFilter(filterBy: string): Curso[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.cursosAllArray.filter((curso: Curso) =>
              curso.Sigla.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
              curso.Nome.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onBuscar() {
    this.performFilter(this.inputBusca);
  }

  onLimparInput() {
    this.inputBusca = '';
  }

  onDeleteCurso(indexCurso: number) {
    this.disciplinaService.deleteDisciplinaCurso(this.index, indexCurso);
    this.cursosDisciplinaArray = this.disciplinaService.fetchDisciplinaCurso(this.index);
  }

  onAddCurso(indexCurso: number) {
    this.disciplinaService.addDisciplinaCurso(this.index, this.filteredCursos[indexCurso]);
    this.cursosDisciplinaArray = this.disciplinaService.fetchDisciplinaCurso(this.index);
  }

  checkCursoOnList(curso: Curso) {
    if (this.cursosDisciplinaArray.some(data => data.Sigla === curso.Sigla)) {
      return false;
    }
    return true;

  }

}
