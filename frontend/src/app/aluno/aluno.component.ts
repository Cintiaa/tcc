import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { AlunoService } from '../services/aluno.service';
import { CursoService } from '../services/curso.service';



@Component({
  templateUrl: 'aluno.component.html',
  styleUrls: ['aluno.component.css']
})

export class AlunoComponent implements OnInit {

  aluno = [];
  curso = [];
  alunoEdit: any;
  cadtrAluno = false;
  listaAluno = false;
  msg = false;

  busca = {
    RA: '',
    Nome: '',
    IdCurso: ''
  }

  limparInput() {
    this.busca = {
      RA: '',
      Nome: '',
      IdCurso: '',
    },
    this.msg = false;
    this.listaAluno = false;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AlunoService,
    private cursoService: CursoService,
  ) { }

  ngOnInit() {
    this.cursoService.getAllCurso().subscribe(res => {
      this.curso = res;
    });

  }

  buscar() {
    this.service.listarAlunos(this.busca).subscribe(res => {
      this.aluno = res;
      if (res.length === 0) {
        this.msg = true;
        this.listaAluno = false;
      } else {
        this.msg = false;
        this.listaAluno = true;
      }
    });
  }

  editarAluno(id) {
    this.service.buscaAlunoId(id).subscribe(res => {
      this.alunoEdit = res;
      console.log(res);
      this.cadtrAluno = true;
      this.listaAluno = false;
    });
  }

  cadastroCallback(e) {
    this.cadtrAluno = false;
    this.msg = false;
  }


  AdicionarAluno(e) {
    this.cadtrAluno = e;
    this.listaAluno = false;
    this.msg = false;
    //this.router.navigate(['newAluno']);
  }
}
