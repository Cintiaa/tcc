import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'angular2-toaster';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { FormBuilder } from '@angular/forms';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';

import * as moment from 'moment';

moment.locale('es');


@Component({
  selector: 'relatorio-lista',
  templateUrl: './relatorio-lista.component.html',
  styleUrls: ['./relatorio-lista.component.css']
})
export class RelatorioListaComponent implements OnInit {
  id: any;
  excluir = false;
 
  excel = [];
  excelFilter = [];
  turmaFilter = [];
  alunoFilter = [];

  @Input() set relatorio(val){
    this.excel = val;
    this.filter(val);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private service: RelatorioService,
    private toasterService: ToasterService
  ) {
  }
  ngOnInit() {
  }

  formatData(e){
    let data = moment(e).format("DD-MM-YYYY");
    if(e != 0) return data;
  }

  filter(e){
  console.log('Relatórios', e);
  if(this.excel.length != 0){
    for(let i = 0; i < this.excel.length; i++){
      this.turmaFilter.push(this.excel[i].Turma);
      this.turmaFilter.push(this.excel[i].Aluno);
    }
    console.log('Turma filtrada', this.turmaFilter);
    console.log('Aluno filtrado', this.alunoFilter);
  }
  }
  exportAsXLSX() {
    this.service.exportAsExcelFile(this.excel, 'relatorio');
  }
}
