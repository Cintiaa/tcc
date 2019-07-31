import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

@Component({
    templateUrl: 'aluno.component.html',
    styleUrls: ['aluno.component.css']
  })

export class AlunoComponent { 
  title = 'Aluno';
  constructor(){}
}
