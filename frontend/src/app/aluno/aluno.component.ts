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

  aluno: [];
  curso: [];
  alunoEdit: any;
  cadtrAluno = false;
  listaAluno = false;

  busca = {
    RA: "",
    Nome: "",
  }

  limparInput() {
    this.busca = {
      RA: "",
      Nome: "",
    }
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
      console.log(this.curso);
    })

  }

  buscar() {
    console.log('Busca', this.busca);
    this.service.listarAlunos(this.busca).subscribe(res => {
      this.aluno = res;
      console.log(this.aluno);
      if (res.length == 0) {
        this.listaAluno = false;
      } else {
        this.listaAluno = true;
      }
    })
  }

  editarAluno(id) {
    console.log(id);
    this.service.buscaAlunoId(id).subscribe(res => {
      this.alunoEdit = res;
      console.log(res);
      this.cadtrAluno = true;
      this.listaAluno = false;
    })
  }

  cadastroCallback(e) {
    this.cadtrAluno = false;
  }
  
  
  AdicionarAluno(e) {
    this.cadtrAluno = e;
    //this.router.navigate(['newAluno']);
  }


}
