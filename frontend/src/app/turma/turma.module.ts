import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { CursoService } from '../services/curso.service';
import { UtilsService } from '../services/utils.service';
import { TurmaRoutingModule } from './turma.routing.module';
import { TurmaCadastroComponent } from './turma-cadastro/turma-cadastro.component';
import { TurmaListaComponent } from './turma-lista/turma-lista.component';
import { TurmaService } from '../services/turma.service';
import { TurmaAlunoComponent } from './turma-aluno/turma-aluno.component';


@NgModule({
    imports: [
        CommonModule,
        TurmaRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule ,
        ToastrModule.forRoot()
    ],
    exports: [TurmaCadastroComponent, TurmaListaComponent, TurmaAlunoComponent],
    declarations: [TurmaCadastroComponent, TurmaListaComponent, TurmaAlunoComponent],
    providers: [HttpClientModule, TurmaService, CursoService, UtilsService ]
})

export class TurmaModule{

}