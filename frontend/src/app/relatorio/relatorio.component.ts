import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { RelatorioService } from '../services/relatorio.service';
import { TurmaService } from '../services/turma.service';


@Component({
  templateUrl: 'relatorio.component.html',
  styleUrls: ['relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

    title = 'excel-download';
    excel = [];
    turma = [];
    listaRelatorio = false;

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
  ) { 
      this.service.getJSON(1).subscribe(res =>{
          res.forEach(row => {
              this.excel.push(row);
          });
      });
  }

  ngOnInit() {
    this.turmaService.getAllTurmas().subscribe(res => {
        this.turma = res;
    });
  }

  exportAsXLSX(){
      this.service.exportAsExcelFile(this.excel, 'sample');
  }

  limparInput(){
    this.busca = {
        IdTurma: 0,
        DtAula: 0
    }
  }
  buscar(){

  }



}

