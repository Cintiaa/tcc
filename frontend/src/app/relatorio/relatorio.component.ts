import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { RelatorioService } from '../services/relatorio.service';
import { TurmaService } from '../services/turma.service';


import * as moment from 'moment';

moment.locale('es');

@Component({
  templateUrl: 'relatorio.component.html',
  styleUrls: ['relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  title = 'excel-download';

  turma = [];
  relatorio: any = [];

  listaRelatorio = false;
  msg = false;

  id: any;

  busca = {
    IdTurma: 0,
    DtAula: 0
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RelatorioService,
    private turmaService: TurmaService,
  ) { }

  ngOnInit() {
    this.turmaService.getAllTurmas().subscribe(res => {
      this.turma = res;
    });
  }

  buscar() {
    console.log(this.busca);
    this.service.getJSON(this.busca).subscribe(res => {
      this.relatorio = res;
      console.log('Relatório', this.relatorio);

      if (res.length == 0) {
        this.msg = true;
        this.listaRelatorio = false;
      } else {
        this.msg = false;
        this.listaRelatorio = true;
      }
    });
  }
  limparInput() {
    this.busca = {
      IdTurma: 0,
      DtAula: 0
    },
      this.msg = false;
    this.listaRelatorio = false;
  }

}

