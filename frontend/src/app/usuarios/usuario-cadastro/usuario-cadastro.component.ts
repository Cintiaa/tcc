import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

import { UsuarioService } from './../../services/usuario.service';


@Component({
  selector: 'usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  user = [];
  editando = false;


  usuario = {
    IdUsuario: 0,
    email: '',
    password: ''
  }

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private service: UsuarioService,
    private toastr: ToastrService
  ) {
    this.Initiate(false);
  }


  @Output() completed = new EventEmitter();

  ngOnInit() {
  }

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
      this.usuario = this.getJSON(this.usuario);
      this.service.createUsuario(this.usuario).subscribe(res => {
        this.toastr.success('Usuario cadastrado com sucesso!', 'Sucesso', { timeOut: 3000 });
        this.Initiate(false);
      });
    } else {
      this.toastr.error('Preencha todos os campos!', 'Atenção', { timeOut: 3000 });

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



  /* 
    editUsuario(el) {
      this.Initiate(true, () => {
        this.form.get('IdUsuario').setValue(el[0].IdAluno);
        this.form.get('email').setValue(el[0].RA);
        this.form.get('Nome').setValue(el[0].Nome);
        this.form.get('IdCurso').setValue(el[0].IdCurso);
        this.form.get('IsDeleted').setValue(el[0].IsDeleted);
      });
    }
   */
  Initiate(edit, callback = null) {
    if (!edit) {
      this.form = this.fb.group({
        IdUsuario: new FormControl(0),
        email: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
      });

    }
    console.log('form', this.form);
    this.editando = edit;
    if (callback) callback();
  }

}
