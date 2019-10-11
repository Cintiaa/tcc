import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup, FormControl, Validators,
  AbstractControl, AsyncValidatorFn, ValidationErrors, FormBuilder
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Curso } from '../curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'curso-cadastro',
  templateUrl: './curso-cadastro.component.html',
  styleUrls: ['../curso.css']
})
export class CursoCadastroComponent implements OnInit {
  // @ViewChild('f', { static: false }) form: NgForm;
  form: FormGroup;
  index: number;
  editMode = false;
  cursoItem: Curso;
  editando = false;

  curso = {
    IdCurso: 0,
    Sigla: '',
    Nome: '',
    IsDeleted: 0
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private service: CursoService,
    private toastr: ToastrService
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
            this.service.getCurso(this.index)
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
      ); */
  }


  @Input()
  set cursoEdit(val) {
    if (val) {
      this.editCurso(val);
      this.editando = true;
    }
  }

  @Output() completed = new EventEmitter();
  /*  initForm() {
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
   } */

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
      this.curso = this.getJSON(this.curso);
      if (!this.editando) {
        this.service.cadastrarCurso(this.curso).subscribe(res => {
          this.toastr.success('Sucesso', 'Curso cadastrado com sucesso!', {
            timeOut: 3000
          });
          this.completed.emit(a);
          this.Initiate(false);

        });
      }
      if (this.editando) {
        this.service.updateCurso(this.curso).subscribe(res => {
          this.toastr.success('Sucesso', 'Curso atualizado com sucesso!', { timeOut: 3000 });
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
        IdCurso: new FormControl(0),
        Sigla: new FormControl(null, [Validators.required]),
        Nome: new FormControl(null, [Validators.required]),
        IsDeleted: new FormControl(0),
      });

    }
    console.log('form', this.form);
    this.editando = edit;
    if (callback) callback();
  }


  editCurso(el) {
this.Initiate(true, () => {
      this.form.get('IdCurso').setValue(el[0].IdCurso);
      this.form.get('Sigla').setValue(el[0].Sigla);
      this.form.get('Nome').setValue(el[0].Nome);
      this.form.get('IsDeleted').setValue(el[0].IsDeleted);
    });
  }
  
  get sigla() {
    return this.form.get('sigla');
  }

  get nome() {
    return this.form.get('nome');
  }

  /*  onSubmit() {
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
             return response.curso ? { 'siglaNotUnique': true } : null;
           } else {
             return null;
           }
         }));
     };
   } */
}
