import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'angular2-toaster';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { FormBuilder } from '@angular/forms';




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

  exportAsXLSX() {
    this.service.exportAsExcelFile(this.excel, 'relatorio');
  }
}
