import { UtilsService } from 'src/app/services/utils.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'professor-cadastro',
  templateUrl: './professor-cadastro.component.html',
  styleUrls: ['./professor-cadastro.component.css']
})
export class ProfessorCadastroComponent implements OnInit {
  editando = false;
  departamento = [];

  professor = {
    IdProfessor: 0,
    RA: "",
    Nome: "",
    IdDepartamento: 0,
    IsDeleted: 0,
  }

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private service: ProfessorService,
    private utils: UtilsService,
    private toastr: ToastrService
  ) {
    this.Initiate(false);
  }


  @Input()
  set professorEdit(val) {
    if (val) {
      this.editProfessor(val);
      this.editando = true;
    }
  }

  @Output() completed = new EventEmitter();

  ngOnInit() {
    this.utils.getAllDepartamentos().subscribe(res => {
      this.departamento = res;
    });
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
      this.professor = this.getJSON(this.professor);
      if (!this.editando) {
        this.service.cadastrarProfessor(this.professor).subscribe(res => {
          this.toastr.success('Sucesso', 'Professor cadastrado com sucesso!', {
            timeOut: 3000
          });
          this.completed.emit(a);
          this.Initiate(false);

        });
      }
      if (this.editando) {
        this.service.updateProfessor(this.professor).subscribe(res => {
          this.toastr.success('Sucesso', 'Professor atualizado com sucesso!', { timeOut: 3000 });
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

  editProfessor(el) {
    this.Initiate(true, () => {
      this.form.get('IdProfessor').setValue(el[0].IdProfessor);
      this.form.get('RA').setValue(el[0].RA);
      this.form.get('Nome').setValue(el[0].Nome);
      this.form.get('IdDepartamento').setValue(el[0].IdDepartamento);
      this.form.get('IsDeleted').setValue(el[0].IsDeleted);
    });
  }

  Initiate(edit, callback = null) {
    if (!edit) {
      this.form = this.fb.group({
        IdProfessor: new FormControl(0),
        RA: new FormControl(null, [Validators.required]),
        Nome: new FormControl(null, [Validators.required]),
        IdDepartamento: new FormControl(null, [Validators.required]),
        IsDeleted: new FormControl(0),
      });

    }
    console.log('form', this.form);
    this.editando = edit;
    if (callback) callback();
  }

}
