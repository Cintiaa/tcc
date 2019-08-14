import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  templateUrl: 'aluno.component.html',
  styleUrls: ['aluno.component.css']
})

export class AlunoComponent implements OnInit {

  cadrAluno = false;

  busca = {
    ra: "",
    nome: "",
  }

  limparInput() {
    this.busca = {
      ra: "",
      nome: "",
    }
  }

  buscar(){}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  AdicionarAluno() {
    this.router.navigate(['newAluno']);
  }


}
