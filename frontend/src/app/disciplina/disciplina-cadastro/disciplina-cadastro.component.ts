import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup, FormControl, Validators,
  AbstractControl, AsyncValidatorFn, ValidationErrors, FormBuilder
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Disciplina } from '../disciplina.model';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'disciplina-cadastro',
  templateUrl: './disciplina-cadastro.component.html',
  styleUrls: ['../disciplina.css']
})
export class DisciplinaCadastroComponent implements OnInit {
  // @ViewChild('f', { static: false }) form: NgForm;

  index: number;
  editMode = false;
  disciplinaItem: Disciplina;
  editando = false;

  disciplina = {
    IdDisciplina: 0,
    Sigla: '',
    Nome: '',
    IsDeleted: 0
  }

  form: FormGroup;

  constructor(
    private disciplinaService: DisciplinaService,
    private toastr: ToastrService,
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.Initiate(false);
  }


  ngOnInit() {
    /* this.route.params
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
      ); */
  }

  @Input()
  set disciplinaEdit(val) {
    if (val) {
      this.editDisciplina(val);
      this.editando = true;
      console.log(val)
    }
  }

  @Output() completed = new EventEmitter();


  getJSON(obj) {
    for (var prop in this.form.controls) {
      obj[prop] = this.form.controls[prop].value;
    }
    return obj;
  }

  cadastrar(a) {
    if (!a) {
      this.completed.emit(a);
      this.Initiate(false);
      return;
    }
    if (this.validateInfos()) {
      this.disciplina = this.getJSON(this.disciplina);
      if (!this.editando) {
        this.disciplinaService.cadastrarDisciplina(this.disciplina).subscribe(res => {
          this.toastr.success('Sucesso', 'Disciplina cadastrada com sucesso!', {
            timeOut: 3000
          });
          this.completed.emit(a);
          this.Initiate(false);

        });
      }
      if (this.editando) {
        this.disciplinaService.updateDisciplina(this.disciplina).subscribe(res => {
          this.toastr.success('Sucesso', 'Disciplina atualizada com sucesso!', { timeOut: 3000 });
          this.completed.emit(a);
          this.Initiate(false);
        })
      }

    } else {
      this.toastr.error('Atenção', 'Preencha todos os campos!', {
        timeOut: 3000
      });
    }
  }

  setFormErrors(parent) {
    Object.keys(parent.controls).forEach(key => {
      parent.get(key).markAsTouched({ onlySelf: true });
      if ((<any>parent.get(key)).controls) {
        this.setFormErrors(<any>parent.get(key));
      }
    });
  }

  validateInfos() {
    if (this.form.invalid) {
      this.setFormErrors(this.form);
      return false;
    } else {
      return true;
    }
  }

  Initiate(edit, callback = null) {
    if (!edit) {
      this.form = this.fb.group({
        IdDisciplina: new FormControl(0),
        Sigla: new FormControl(null, [Validators.required]),
        Nome: new FormControl(null, [Validators.required]),
        IsDeleted: new FormControl(0),
      });

    }
    console.log('form', this.form);
    this.editando = edit;
    if (callback) callback();
  }


  editDisciplina(el) {
    this.Initiate(true, () => {
      this.form.get('IdDisciplina').setValue(el.IdDisciplina);
      this.form.get('Sigla').setValue(el.Sigla);
      this.form.get('Nome').setValue(el.Nome);
      this.form.get('IsDeleted').setValue(el.IsDeleted);
    });
  }

  /*   initForm() {
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
              return response.disciplina ? { 'siglaNotUnique': true } : null;
            } else {
              return null;
            }
          }));
      };
    }
   */
}
