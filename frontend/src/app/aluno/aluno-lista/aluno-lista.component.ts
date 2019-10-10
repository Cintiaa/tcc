import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno.service';
import { ToastrService } from 'ngx-toastr';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'aluno-lista',
  templateUrl: './aluno-lista.component.html',
  styleUrls: ['./aluno-lista.component.css']
})
export class AlunoListaComponent implements OnInit {
  values = [];
  id: any;
  excluir = false;
  alunoFilter = [];
  alunos = [];


  @Input() set aluno(val) {
    this.values = val;
  }

  @Output() editar = new EventEmitter();


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: AlunoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.service.getAllAlunos().subscribe(res => {
      this.alunoFilter = res;
    });
  }

  editarAluno(e) {
    console.log(e);
    this.editar.emit(e);
  }

  remover() {
    this.alunos = this.alunoFilter.filter((item) => item.IdAluno == this.id);
    if (this.alunos.length != 0) {
      this.service.removeAluno(this.alunos[0]).subscribe(res => {
        console.log(res);
        this.toastr.success('Aluno removido com sucesso!', 'Sucesso');
        this.values = this.values.filter(e => e.IdAluno != this.id);
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
