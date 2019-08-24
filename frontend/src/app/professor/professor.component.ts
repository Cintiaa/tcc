import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
    templateUrl: 'professor.component.html',
    styleUrls: ['professor.component.css']
  })
export class ProfessorComponent implements OnInit { 

  cadrProfessor = false;

  busca = {
    nome: "",
  }

  limparInput() {
    this.busca = {
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

  AdicionarProfessor() {
    this.router.navigate(['newProfessor']);
  }

}

