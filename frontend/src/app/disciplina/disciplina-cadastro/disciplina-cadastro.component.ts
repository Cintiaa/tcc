import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators,
         AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DisciplinaService } from '../disciplina.service';
import { Disciplina } from '../disciplina.model';

@Component({
  selector: 'app-disciplina-cadastro',
  templateUrl: './disciplina-cadastro.component.html',
  styleUrls: ['../disciplina.css']
})
export class DisciplinaCadastroComponent implements OnInit {
  // @ViewChild('f', { static: false }) form: NgForm;
  form: FormGroup;
  index: number;
  editMode = false;
  disciplinaItem: Disciplina;

  constructor(private disciplinaService: DisciplinaService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = params['index'];
          this.editMode = params['index'] != null;
          if (this.editMode) {
            this.disciplinaService.getDisciplina(this.index)
             .subscribe(response => {
               this.disciplinaItem = response.disciplina;
               this.initForm();
               console.log(this.disciplinaItem);
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
      siglaItem = this.disciplinaItem.Sigla;
      nomeItem = this.disciplinaItem.Nome;
    }
    this.form = new FormGroup({
      'sigla': new FormControl(siglaItem, Validators.required, this.uniqueSigla(this.disciplinaService, this.editMode)),
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
      this.disciplinaService.updateDisciplina(this.form.value.sigla, this.form.value.nome, this.index, this.disciplinaItem)
        .subscribe();
    } else {
      this.disciplinaService.addDisciplina(this.form.value.sigla, this.form.value.nome)
        .subscribe();
    }
    this.router.navigate(['disciplina']);
  }

  onDelete() {
    this.disciplinaService.deleteDisciplina(this.index, this.disciplinaItem)
      .subscribe();
    this.router.navigate(['disciplina']);
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  uniqueSigla(disciplinaService: DisciplinaService, editMode: boolean): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return disciplinaService.fetchDisciplinaSigla(control.value)
              .pipe(map(response => {
                  if (!editMode) {
                    return response.disciplina ? {'siglaNotUnique': true} : null;
                  } else {
                    return null;
                  }
      }));
    };
  }

}
