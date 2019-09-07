import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CursoService } from '../curso.service';
import { Curso } from '../curso.model';

@Component({
  selector: 'app-curso-lista',
  templateUrl: './curso-lista.component.html',
  styleUrls: ['../curso.css']
})
export class CursoListaComponent implements OnInit, OnDestroy {
  cursosArray: Array<Curso> = [];
  filteredCursos: Array<Curso> = [];
  cursoSubscription: Subscription;

  _inputBusca: string;
  get inputBusca(): string {
      return this._inputBusca;
  }
  set inputBusca(value: string) {
      this._inputBusca = value;
      this.filteredCursos = this.inputBusca ? this.performFilter(this.inputBusca) : this.cursosArray;
  }

  constructor(private cursoService: CursoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cursoSubscription = this.cursoService.cursosChanged
      .subscribe((cursos: Curso[]) => {
        this.cursosArray = cursos;
        this.filteredCursos = this.cursosArray;
      });
    this.cursosArray = this.cursoService.fetchCursos();
    this.filteredCursos = this.cursosArray;
  }

  ngOnDestroy() {
    this.cursoSubscription.unsubscribe();
  }

  performFilter(filterBy: string): Curso[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.cursosArray.filter((curso: Curso) =>
              curso.Sigla.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
              curso.Nome.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onBuscar() {
    this.performFilter(this.inputBusca);
  }

  onLimparInput() {
    this.inputBusca = '';
  }
}
