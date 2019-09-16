import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AlunoComponent } from './aluno.component';
import { AlunoListaComponent } from './aluno-lista/aluno-lista.component';
import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { AlunoRoutingModule } from './aluno.routing.module';
import { AlunoService } from '../services/aluno.service';
import { CursoService } from '../services/curso.service';
import { ToastrModule } from 'ngx-toastr';
import { UtilsService } from '../services/utils.service';




@NgModule({
    imports: [
        CommonModule,
        AlunoRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule ,
        ToastrModule.forRoot()
    ],
    exports: [AlunoCadastroComponent, AlunoListaComponent],
    declarations: [AlunoCadastroComponent, AlunoListaComponent],
    providers: [HttpClientModule, AlunoService, CursoService, UtilsService ]
})

export class AlunoModule{

}