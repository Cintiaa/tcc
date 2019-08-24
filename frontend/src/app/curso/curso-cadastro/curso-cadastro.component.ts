import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { CursoService } from '../curso.service';
import { Curso } from '../curso.model';

@Component({
  selector: 'app-curso-cadastro',
  templateUrl: './curso-cadastro.component.html',
  styleUrls: ['../curso.css']
})
export class CursoCadastroComponent implements OnInit {
  // @ViewChild('f', { static: false }) form: NgForm;
  form: FormGroup;
  index: number;
  editMode = false;
  cursoItem: Curso;

  constructor(private cursoService: CursoService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = params['index'];
          this.editMode = params['index'] != null;
          if (this.editMode) {
            this.cursoItem = this.cursoService.getCurso(this.index);
          }
          this.initForm();
        }
      );
  }

  initForm() {
    let siglaItem = '';
    let nomeItem = '';
    if (this.editMode) {
      siglaItem = this.cursoItem.id;
      nomeItem = this.cursoItem.name;
    }
    this.form = new FormGroup({
      'sigla': new FormControl(siglaItem, Validators.required),
      'nome': new FormControl(nomeItem, Validators.required)
    });
  }

  get sigla() {
    return this.form.get('sigla');
  }

  get nome() {
    return this.form.get('nome');
  }

  onSubmit() {
    const newCurso = new Curso(this.form.value.sigla, this.form.value.nome);
    if (this.editMode) {
      this.cursoService.updateCurso(newCurso, this.index);
    } else {
      this.cursoService.addCurso(newCurso);
    }
    this.router.navigate(['curso']);
  }

  onDelete() {
    this.cursoService.deleteCurso(this.index);
    this.router.navigate(['curso']);
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }


}
