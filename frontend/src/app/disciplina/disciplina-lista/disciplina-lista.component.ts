import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DisciplinaService } from '../disciplina.service';
import { Disciplina } from '../disciplina.model';


@Component({
  selector: 'app-disciplina-lista',
  templateUrl: './disciplina-lista.component.html',
  styleUrls: ['../disciplina.css']
})
export class DisciplinaListaComponent implements OnInit {
  disciplinasArray: Array<Disciplina> = [];
  filteredDisciplinas: Array<Disciplina> = [];

  _inputBusca: string;
  get inputBusca(): string {
      return this._inputBusca;
  }
  set inputBusca(value: string) {
      this._inputBusca = value;
      this.filteredDisciplinas = this.inputBusca ? this.performFilter(this.inputBusca) : this.disciplinasArray;
  }

  constructor(private disciplinaService: DisciplinaService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.disciplinasArray = this.disciplinaService.fetchDisciplinas();
    this.filteredDisciplinas = this.disciplinasArray;
  }

  performFilter(filterBy: string): Disciplina[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.disciplinasArray.filter((disciplina: Disciplina) =>
              disciplina.sigla.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
              disciplina.nome.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onBuscar() {
    this.performFilter(this.inputBusca);
  }

  onLimparInput() {
    this.inputBusca = '';
  }

}
