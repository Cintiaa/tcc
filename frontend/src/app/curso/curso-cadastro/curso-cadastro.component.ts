import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators,
         AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
            this.cursoService.getCurso(this.index)
             .subscribe(response => {
               this.cursoItem = response.curso;
               this.initForm();
               console.log(this.cursoItem);
             });
          }
          else {
            this.initForm();
          }
        }
      );
  }

  initForm() {
    let siglaItem = '';
    let nomeItem = '';
    if (this.editMode) {
      siglaItem = this.cursoItem.Sigla;
      nomeItem = this.cursoItem.Nome;
    }
    this.form = new FormGroup({
      'sigla': new FormControl(siglaItem, Validators.required, this.uniqueSigla(this.cursoService, this.editMode)),
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
    if (this.editMode) {
      this.cursoService.updateCurso(this.form.value.sigla, this.form.value.nome, this.cursoItem)
        .subscribe();
    } else {
      this.cursoService.addCurso(this.form.value.sigla, this.form.value.nome)
      .subscribe();
    }
    this.router.navigate(['curso']);
  }

  onDelete() {
    this.cursoService.deleteCurso(this.cursoItem).subscribe();;
    this.router.navigate(['curso']);
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  uniqueSigla(cursoService: CursoService, editMode: boolean): AsyncValidatorFn {

    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return cursoService.fetchCursoSigla(control.value)
              .pipe(map(response => {
                  if (!editMode) {
                    return response.curso ? {'siglaNotUnique': true} : null;
                  } else {
                    return null;
                  }
      }));
    };
  }
}
