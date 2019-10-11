import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TurmaService } from 'src/app/services/turma.service';



@Component({
  selector: 'turma-lista',
  templateUrl: 'turma-lista.component.html',
  styleUrls: ['turma-lista.component.css']
})

export class TurmaListaComponent implements OnInit {

  public paginaAtual = 1;
  
  values = [];
  id: any;
  excluir = false;
  turmaFilter = [];
  turmas = [];


  @Input() set turma(val) {
    this.values = val;
  }

  @Output() editar = new EventEmitter();
  @Output() vincular = new EventEmitter();


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: TurmaService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.service.getAllTurmas().subscribe(res => {
      this.turmaFilter = res;
    })
  }

  editarTurma(e) {
    console.log(e);
    this.editar.emit(e);
  }

  vincularAluno(e) {
    console.log(e);
    this.vincular.emit(e);
  }

  remover() {
    this.turmas = this.turmaFilter.filter((item) => item.IdTurma == this.id);
    if (this.turmas.length != 0) {
      this.service.removeTurma(this.turmas[0]).subscribe(res => {
        console.log(res);
        this.toastr.success('Sucesso', 'Turma removido com sucesso!', { timeOut: 3000 });
        this.values = this.values.filter(e => e.IdTurma != this.id);
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
