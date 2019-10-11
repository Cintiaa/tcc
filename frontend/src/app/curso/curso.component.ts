import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.css']
})
export class CursoComponent {

  curso = [];
  vinculo: any = [];
  cursoEdit: any;
  
  cadtrCurso = false;
  listaCurso = false;
  cadtrCursoDisciplina = false;
  msg = false;

  busca = {
    Sigla: '',
    Nome: ''
  }

  limparInput() {
    this.busca = {
      Sigla: '',
      Nome: ''
    },
      this.msg = false;
    this.listaCurso = false;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CursoService
  ) { }

  buscar() {
    console.log('Busca', this.busca);
    this.service.listarCursos(this.busca).subscribe(res => {
      this.curso = res;
      if (res.length === 0) {
        this.msg = true;
        this.listaCurso = false;
      } else {
        this.msg = false;
        this.listaCurso = true;
      }
    });
  }

  editarCurso(id) {
    this.service.buscaCursoId(id).subscribe(res => {
      this.cursoEdit = res;
      this.cadtrCurso = true;
      this.listaCurso = false;
    });
  }

  vincularDisciplina(id) {
    this.service.buscaCursoId(id).subscribe(res => {
      this.vinculo = res;
      console.log(this.vinculo);
      this.cadtrCursoDisciplina = true;
      this.listaCurso = false;
    });
  }

  cadastroCallback(e) {
    this.cadtrCurso = false;
    this.cadtrCursoDisciplina = false;
    this.msg = false;
  }

  onAdicionar(e) {
    this.cadtrCurso = e;
    this.listaCurso = false;
    //this.router.navigate(['new'], { relativeTo: this.route });
  }

}
