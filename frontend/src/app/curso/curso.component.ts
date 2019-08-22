import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CursoService } from './curso.service';
import { Curso } from './curso.model';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.css']
})
export class CursoComponent implements OnInit {
  cursosArray: Array<Curso> = [];

  constructor(private cursoService: CursoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cursosArray = this.cursoService.fetchCursos();
  }

  onAdicionar() {
    this.router.navigate(['../newCurso'], {relativeTo: this.route});
  }

}
