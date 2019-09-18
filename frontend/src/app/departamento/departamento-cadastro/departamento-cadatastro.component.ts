import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartamentoService } from 'src/app/services/departamento.service';


@Component({
  selector: 'departamento-cadastro',
  templateUrl: 'departamento-cadastro.component.html',
  styleUrls: ['departamento-cadastro.component.css']
})

export class DepartamentoCadastroComponent implements OnInit {

  editando = false;

  departamento = {
    IdDepartamento: 0,
    Sigla: "",
    Nome: "",
    IsDeleted: 0,
  }

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private service: DepartamentoService,
    private toastr: ToastrService
  ) {
    this.Initiate(false);
  }


  @Input()
  set departamentoEdit(val) {
    if (val) {
      this.editDepartamento(val);
      this.editando = true;
    }
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
      this.departamento = this.getJSON(this.departamento);
      if (!this.editando) {
        this.service.cadastrarDepartamento(this.departamento).subscribe(res => {
          this.toastr.success('Sucesso', 'Departamento cadastrado com sucesso!', {
            timeOut: 3000
          });
          this.completed.emit(a);
          this.Initiate(false);

        });
      }
      if (this.editando) {
        this.service.updateDepartamento(this.departamento).subscribe(res => {
          this.toastr.success('Sucesso', 'Departamento atualizado com sucesso!', { timeOut: 3000 });
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

  editDepartamento(el) {
    this.Initiate(true, () => {
      this.form.get('IdDepartamento').setValue(el[0].IdDepartamento);
      this.form.get('Sigla').setValue(el[0].Sigla);
      this.form.get('Nome').setValue(el[0].Nome);
      this.form.get('IsDeleted').setValue(el[0].IsDeleted);
    });
  }

  Initiate(edit, callback = null) {
    if (!edit) {
      this.form = this.fb.group({
        IdDepartamento: new FormControl(0),
        Sigla: new FormControl(null, [Validators.required]),//salvar todas as siglas em maiúsculo
        Nome: new FormControl(null, [Validators.required]),
        IsDeleted: new FormControl(0),
      });

    }
    console.log('form', this.form);
    this.editando = edit;
    if (callback) callback();
  }

}
