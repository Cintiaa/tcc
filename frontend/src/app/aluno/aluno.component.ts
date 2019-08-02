import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component,  OnInit, Output, EventEmitter, Input } from '@angular/core';
import {RouterModule, Routes, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
    templateUrl: 'aluno.component.html',
    styleUrls: ['aluno.component.css']
  })

export class AlunoComponent implements OnInit{ 

  constructor(){}

  ngOnInit() {
  }

  /* tb_aluno = {
    id_aluno: 0,
    tx_nome: "",
	  id_curso: 0 
  }

  @Output() completed = new EventEmitter();

  form;
  constructor(
    private router: Routes,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
  ){
    this.Initiate(false);
  }

  Initiate(edit, callback = null) {
    this.form = this.fb.group({
      id_aluno: new FormControl(0),
      tx_nome: new FormControl(null, [Validators.required]),
      id_curso: new FormControl(0)
    });

    if (callback) callback();
  } */
}
