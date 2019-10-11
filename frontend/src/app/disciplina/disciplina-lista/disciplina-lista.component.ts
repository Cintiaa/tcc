import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { Disciplina } from '../disciplina.model';
import { ToastrService } from 'ngx-toastr';
import { DisciplinaService } from 'src/app/services/disciplina.service';


@Component({
  selector: 'disciplina-lista',
  templateUrl: './disciplina-lista.component.html',
  styleUrls: ['../disciplina.css']
})
export class DisciplinaListaComponent implements OnInit {
  public paginaAtual = 1;

  disciplinasArray = [];
  filteredDisciplinas = [];

  values = [];
  id: any;
  excluir = false;
  /*  _inputBusca: string;
   get inputBusca(): string {
       return this._inputBusca;
   }
   set inputBusca(value: string) {
       this._inputBusca = value;
       this.filteredDisciplinas = this.inputBusca ? this.performFilter(this.inputBusca) : this.disciplinasArray;
   }
  */
  constructor(
    private disciplinaService: DisciplinaService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.disciplinaService.getAllDisciplinas().subscribe(response => {
        this.disciplinasArray = response;
      });

  }

  @Input() set disciplina(val) {
    this.values = val;
    console.log(this.values)
  }

  @Output() editar = new EventEmitter();

  editarDisciplina(e) {
    this.editar.emit(e);
    console.log(e);
  }

  remover() {
    this.filteredDisciplinas = this.disciplinasArray.filter((item) => item.IdDisciplina == this.id);
    if (this.filteredDisciplinas.length != 0) {
      this.disciplinaService.removeDisciplina(this.filteredDisciplinas[0]).subscribe(res => {
        console.log(res);
        this.toastr.success('Disciplina removido com sucesso!', 'Sucesso');
        this.values = this.values.filter(e => e.IdDisciplina != this.id);
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


 /*  ngOnDestroy() {
  }

  performFilter(filterBy: string): Disciplina[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.disciplinasArray.filter((disciplina: Disciplina) =>
      disciplina.Sigla.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      disciplina.Nome.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onBuscar() {
    this.performFilter(this.inputBusca);
  }

  onLimparInput() {
    this.inputBusca = '';
  } 
}*/

