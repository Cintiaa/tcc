import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DisciplinaService } from '../services/disciplina.service';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.css']
})
export class DisciplinaComponent implements OnInit {

  disciplinaEdit: any;
  cadtrDisciplina = false;
  listaDisciplina = false;
  msg = false;

  disciplina = [];

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
    this.listaDisciplina = false;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: DisciplinaService
  ) { }

  ngOnInit() {

  }

  buscar() {
    this.service.listarDisciplinas(this.busca).subscribe(res => {
      this.disciplina = res;
      if (res.length == 0) {
        this.msg = true;
        this.listaDisciplina = false;
      } else {
        this.msg = false;
        this.listaDisciplina = true;
      }
    });
  }

  editarDisciplina(id) {
    this.service.buscaDisciplinaId(id).subscribe(res => {
      this.disciplinaEdit = res;
      console.log(this.disciplinaEdit)
      this.cadtrDisciplina = true;
      this.listaDisciplina = false;
      this.msg = false;
    });
  }

  cadastroCallback(e) {
    this.cadtrDisciplina = false;
    this.msg = false;
  }


  onAdicionar(e) {
    this.cadtrDisciplina = e;
    this.listaDisciplina = false;
    this.msg = false;
    //this.router.navigate(['new'], { relativeTo: this.route });
  }

}
