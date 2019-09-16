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

  curso: [];
  editando = false;
  imagem: FormArray;
  selectedFile: File = null;

  aluno = {
    IdAluno: 0,
    RA: "",
    Nome: "",
    IdCurso: 0,
    IsDeleted: 0,
    ImagemFaces: this.imagem,
  }

  img = {
    IdImagem: 0,
    IdAluno: 0,
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


  cadastrar(a) {
    if (!a) {
      this.completed.emit(a);
      this.Initiate(false);
      return;
    }
    if (this.validateInfos()) {
      this.aluno = this.getJSON(this.aluno);
      if (!this.editando) {
        this.service.cadastrarAlunos(this.aluno).subscribe(res => {
          this.toastr.success('Sucesso', 'Aluno cadastrado com sucesso!', {
            timeOut: 3000
          });
          this.completed.emit(a);
          this.Initiate(false);

        });
      }
      if (this.editando) {
        this.service.updateAluno(this.aluno).subscribe(res => {
          this.toastr.success('Sucesso', 'Aluno atualizado com sucesso!', { timeOut: 3000 });
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

  editAluno(el) {
    this.Initiate(true, () => {
      this.form.get('IdAluno').setValue(el[0].IdAluno);
      this.form.get('RA').setValue(el[0].RA);
      this.form.get('Nome').setValue(el[0].Nome);
      this.form.get('IdCurso').setValue(el[0].IdCurso);
      this.form.get('IsDeleted').setValue(el[0].IsDeleted);
    });
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
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.utilsService.upload(fd).subscribe(res => {
      console.log(res);
    })
  }
}
