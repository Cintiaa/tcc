import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

import { AlunoService } from 'src/app/services/aluno.service';
import { CursoService } from 'src/app/services/curso.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css']
})
export class AlunoCadastroComponent implements OnInit {

  curso = [];
  alunos: any = [];
  aluno2 = [];
  editando = false;
  completo = false;
  imagem: FormArray;
  file: File = null;
  upload = [];

  id: any;


  aluno = {
    IdAluno: 0,
    RA: '',
    Nome: '',
    IdCurso: 0,
    IsDeleted: 0
  }

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private service: AlunoService,
    private cursoService: CursoService,
    private utilsService: UtilsService,
    private toastr: ToastrService
  ) {
    this.Initiate(false);
  }


  @Input()
  set alunoEdit(val) {
    if (val) {
      this.editAluno(val);
      this.editando = true;
    }
  }

  @Output() completed = new EventEmitter();

  ngOnInit() {
    this.cursoService.getAllCurso().subscribe(res => {
      this.curso = res;
    });
  }

  getJSON(obj) {
    for (var prop in this.form.controls) {
      obj[prop] = this.form.controls[prop].value;
    }
    return obj;
  }


  voltar(e) {
    this.completed.emit(e);
    this.Initiate(false);
    this.completo = false;
  }

  cadastrar(a) {
    if (!a) {
      this.completed.emit(a);
      this.Initiate(false);
      return;
    }
    console.log(this.form.get('RA').value);
    if (this.validateRA(this.form.get('RA').value)) {
      this.toastr.error('RA já cadastrado', 'Atenção!');
      return false;
    } else {
      if (this.validateInfos()) {
        this.aluno = this.getJSON(this.aluno);
        if (!this.editando) {
          this.service.cadastrarAlunos(this.aluno).subscribe(res => {
            this.toastr.success('Aluno cadastrado com sucesso!', 'Sucesso', { timeOut: 3000 });
            this.complet();
            this.Initiate(false);
            this.completo = true;
          });
        }
        if (this.editando) {
          this.service.updateAluno(this.aluno).subscribe(res => {
            this.toastr.success('Aluno atualizado com sucesso!', 'Sucesso', { timeOut: 3000 });
            this.completed.emit(a);
            this.Initiate(false);
          })
        }

      } else {
        this.toastr.error('Preencha todos os campos!', 'Atenção', { timeOut: 3000 });
      }
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


  validateRA(e) {
    const ra = e;
    console.log(ra);
    console.log(this.alunos.filter((el) => el.RA === ra));
    if (this.alunos.filter((el) => el.RA === ra)) {
      return false;
    } else {
      return true;
    }
  }


  complet() {
    this.aluno2 = [];
    this.service.getAllAlunos().subscribe((res) => {
      this.alunos = res;
      this.aluno2[0] = this.alunos[this.alunos.length - 1];
      if (res.length !== 0 && this.completo === true) {
        this.form.get('IdAluno').setValue(this.aluno2[0].IdAluno);
        this.form.get('RA').setValue(this.aluno2[0].RA);
        this.form.get('Nome').setValue(this.aluno2[0].Nome);
        this.form.get('IdCurso').setValue(this.aluno2[0].IdCurso);
      }
      this.id = this.aluno2[0].IdAluno;
    });
  }


  editAluno(el) {
    this.Initiate(true, () => {
      this.form.get('IdAluno').setValue(el[0].IdAluno);
      this.form.get('RA').setValue(el[0].RA);
      this.form.get('Nome').setValue(el[0].Nome);
      this.form.get('IdCurso').setValue(el[0].IdCurso);
      this.form.get('IsDeleted').setValue(el[0].IsDeleted);
    });
    this.id = el[0].IdAluno;
  }

  Initiate(edit, callback = null) {
    if (!edit) {
      this.form = this.fb.group({
        IdAluno: new FormControl(0),
        RA: new FormControl(null, [Validators.required]),
        Nome: new FormControl(null, [Validators.required]),
        IdCurso: new FormControl(null, [Validators.required]),
        IsDeleted: new FormControl(0),
      });

    }
    console.log('form', this.form);
    this.editando = edit;
    if (callback) callback();
  }

  uploadImage(event) {
    this.file = <File>event.target.files[0];
    console.log(this.file);
  }

  onUpload() {
    const fd: FormData = new FormData();
    console.log('Id', this.id);

    if (this.id !== 0 && this.file !== null) {
      fd.append('imagem', this.file, this.id);
      this.utilsService.upload(this.id, fd).subscribe((res) => {
        this.toastr.success('Imagem adicionada com sucesso!', 'Sucesso', { timeOut: 3000 });
        console.log('File', res);
      },
        (err) => {
          this.id = 0;
          console.log(err);
        });
    }

  }
}
