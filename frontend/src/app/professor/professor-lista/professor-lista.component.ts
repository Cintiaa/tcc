import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProfessorService } from 'src/app/services/professor.service';
import { ToasterService } from 'angular2-toaster';


@Component({
  selector: 'professor-lista',
  templateUrl: './professor-lista.component.html',
  styleUrls: ['./professor-lista.component.css']
})
export class ProfessorListaComponent implements OnInit {

  public paginaAtual = 1;
  values = [];
  id: any;
  excluir = false;
  professorFilter = [];
  professores = [];


  @Input() set professor(val) {
    this.values = val;
  }

  @Output() editar = new EventEmitter();
  @Output() vincular = new EventEmitter();


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProfessorService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.service.getAllProfessores().subscribe(res => {
      this.professorFilter = res;
    })
  }

  editarProfessor(e) {
    console.log(e);
    this.editar.emit(e);
  }

  vincularDisciplina(e) {
    console.log(e);
    this.vincular.emit(e);
  }

  remover() {
    this.professores = this.professorFilter.filter((item) => item.IdProfessor == this.id);
    if (this.professores.length != 0) {
      this.service.removeProfessor(this.professores[0]).subscribe(res => {
        console.log(res);
        this.toasterService.pop('success', 'Sucesso', 'Professor removido com sucesso!');
        this.values = this.values.filter(e => e.IdProfessor != this.id);
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
