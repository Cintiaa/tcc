import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { Curso } from '../curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'curso-lista',
  templateUrl: './curso-lista.component.html',
  styleUrls: ['../curso.css']
})
export class CursoListaComponent implements OnInit {
  cursosArray: Array<Curso> = [];
  filteredCursos: Array<Curso> = [];
  values = [];
  id: any;
  excluir = false;

  /*  _inputBusca: string;
   get inputBusca(): string {
     return this._inputBusca;
   }
   set inputBusca(value: string) {
     this._inputBusca = value;
     this.filteredCursos = this.inputBusca ? this.performFilter(this.inputBusca) : this.cursosArray;
   } */

  @Input() set curso(val) {
    this.values = val;
  }

  @Output() editar = new EventEmitter();

  constructor(
    private service: CursoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.service.getAllCurso().subscribe(response => {
      this.cursosArray = response;
      //this.filteredCursos = this.cursosArray;
    });

  }

 /*  ngOnDestroy() {
  }
 */
  /* performFilter(filterBy: string): Curso[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.cursosArray.filter((curso: Curso) =>
      curso.Sigla.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      curso.Nome.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onBuscar() {
    this.performFilter(this.inputBusca);
  }

  onLimparInput() {
    this.inputBusca = '';
  } */

  editarCurso(e) {
    console.log(e);
    this.editar.emit(e);
  }

  remover() {
    this.filteredCursos = this.cursosArray.filter((item) => item.IdCurso == this.id);
    if (this.filteredCursos.length != 0) {
      this.service.removeCurso(this.filteredCursos[0]).subscribe(res => {
        console.log(res);
        this.toastr.success('Curso removido com sucesso!', 'Sucesso');
        this.values = this.values.filter(e => e.IdCurso != this.id);
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
