import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'departamento-lista',
  templateUrl: 'departamento-lista.component.html',
  styleUrls: ['departamento-lista.component.css']
})

export class DepartamentoListaComponent implements OnInit {

  public paginaAtual = 1;
  
  values = [];
  id: any;
  excluir = false;
  departamentoFilter = [];
  departamentos = [];


  @Input() set departamento(val) {
    this.values = val;
  }

  @Output() editar = new EventEmitter();
  @Output() vincular = new EventEmitter();


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: DepartamentoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.service.getAllDepartamentos().subscribe(res => {
      this.departamentoFilter = res;
    })
  }

  editarDepartamento(e) {
    console.log(e);
    this.editar.emit(e);
  }

  /* vincularDisciplina(e) {
    console.log(e);
    this.vincular.emit(e);
  } */

  remover() {
    this.departamentos = this.departamentoFilter.filter((item) => item.IdDepartamento == this.id);
    if (this.departamentos.length != 0) {
      this.service.removeDepartamento(this.departamentos[0]).subscribe(res => {
        console.log(res);
        this.toastr.success('Sucesso', 'Departamento removido com sucesso!', { timeOut: 3000 });
        this.values = this.values.filter(e => e.IdDepartamento != this.id);
        this.excluir = false;
      });
    }
  }

  cancelar() {
    this.id = 0;
    this.excluir = false;
  }

  confirmar(id) {
    console.log(id);
    this.excluir = true;
    this.id = id;
  }

}
