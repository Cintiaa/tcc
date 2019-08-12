import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CursoService } from '../curso.service';
import { Curso } from '../curso.model';


@Component({
  selector: 'app-curso-lista',
  templateUrl: './curso-lista.component.html',
  styleUrls: ['./curso-lista.component.css']
})
export class CursoListaComponent implements OnInit {
  cursosArray: Array<Curso> = [];

  constructor(private cursoService: CursoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cursosArray = this.cursoService.fetchCursos();
  }

  onNewCurso() {
    this.router.navigate(['../newCurso'], {relativeTo: this.route});
  }

}
