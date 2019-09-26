import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'angular2-toaster';
import { RelatorioService } from 'src/app/services/relatorio.service';




@Component({
  selector: 'relatorio-lista',
  templateUrl: './relatorio-lista.component.html',
  styleUrls: ['./relatorio-lista.component.css']
})
export class RelatorioListaComponent implements OnInit {

  values = [];
  id: any;
  excluir = false;
  professorFilter = [];
  professores = [];

  @Output() editar = new EventEmitter();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: RelatorioService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
   
  }

}
