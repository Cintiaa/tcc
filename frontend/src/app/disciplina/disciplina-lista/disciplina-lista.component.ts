import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DisciplinaService } from '../disciplina.service';
import { Disciplina } from '../disciplina.model';


@Component({
  selector: 'app-disciplina-lista',
  templateUrl: './disciplina-lista.component.html',
  styleUrls: ['../disciplina.css']
})
export class DisciplinaListaComponent implements OnInit, OnDestroy {
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
    this.disciplinaService.fetchDisciplinas()
      .subscribe(response => {
        this.disciplinasArray = response.disciplinas;
        this.filteredDisciplinas = this.disciplinasArray;
      });

  }

  ngOnDestroy() {
  }

  performFilter(filterBy: string): Disciplina[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.disciplinasArray.filter((disciplina: Disciplina) =>
              disciplina.Sigla.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
              disciplina.Nome.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onBuscar() {
    this.performFilter(this.inputBusca);
  }

  onLimparInput() {
    this.inputBusca = '';
  }

}
