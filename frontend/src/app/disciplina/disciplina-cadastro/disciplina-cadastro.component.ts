import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
            this.disciplinaItem = this.disciplinaService.getDisciplina(this.index);
          }
          this.initForm();
        }
      );
  }

  initForm() {
    let siglaItem = '';
    let nomeItem = '';
    if (this.editMode) {
      siglaItem = this.disciplinaItem.sigla;
      nomeItem = this.disciplinaItem.nome;
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
    const newDisciplina = new Disciplina(this.form.value.sigla, this.form.value.nome);
    if (this.editMode) {
      this.disciplinaService.updateDisciplina(newDisciplina, this.index);
    } else {
      this.disciplinaService.addDisciplina(newDisciplina);
    }
    this.router.navigate(['disciplina']);
  }

  onDelete() {
    this.disciplinaService.deleteDisciplina(this.index);
    this.router.navigate(['disciplina']);
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }


}
