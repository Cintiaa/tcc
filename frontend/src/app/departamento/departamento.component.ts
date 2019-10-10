import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { DepartamentoService } from '../services/departamento.service';


@Component({
  templateUrl: 'departamento.component.html',
  styleUrls: ['departamento.component.css']
})

export class DepartamentoComponent implements OnInit {

  departamento: [];
  departamentoEdit: any;
  vinculo: any = [];
  cadtrDepartamento = false;
  /* cadtrDepartamentoDisciplina = false; */
  listaDepartamento = false;
  msg = false;

  busca = {
    Sigla: "",
    Nome: "",
  }

  limparInput() {
    this.busca = {
      Sigla: "",
      Nome: "",
    }
    this.msg = false;
    this.listaDepartamento = false;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DepartamentoService,
  ) { }

  ngOnInit() {
  }

  buscar() {
    console.log('Busca', this.busca);
    this.service.listarDepartamentos(this.busca).subscribe(res => {
      this.departamento = res;

      if (res.length == 0) {
        this.msg = true;
        this.listaDepartamento = false;
      } else {
        this.msg = false;
        this.listaDepartamento = true;
      }
    })
  }


  editarDepartamento(id) {
    this.service.buscaDepartamentoId(id).subscribe(res => {
      this.departamentoEdit = res;
      this.cadtrDepartamento = true;
      this.listaDepartamento = false;
    });
  }

 /*  vincularDisciplina(id) {
    console.log(id);
    this.service.buscaDepartamentoId(id).subscribe(res => {
      this.vinculo = res;
      this.cadtrDepartamentoDisciplina = true;
      this.listaDepartamento = false;
    });
  } */

  cadastroCallback(e) {
    this.cadtrDepartamento = false;
  }
 
  AdicionarDepartamento(e) {
    this.cadtrDepartamento = e;
    this.listaDepartamento = false;
  }

}
