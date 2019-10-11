
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { DisciplinaRoutingModule } from './disciplina.routing.module';
import { DisciplinaComponent } from './disciplina.component';
import { DisciplinaCadastroComponent } from './disciplina-cadastro/disciplina-cadastro.component';
import { DisciplinaListaComponent } from './disciplina-lista/disciplina-lista.component';
import { AssociarDisciplinaCursoComponent } from './associar-disciplina-curso/associar-disciplina-curso.component';
import { DisciplinaService } from '../services/disciplina.service';

@NgModule({
    imports: [
        CommonModule,
        DisciplinaRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule
    ],
    exports: [DisciplinaCadastroComponent, DisciplinaListaComponent, DisciplinaComponent, AssociarDisciplinaCursoComponent],
    declarations: [DisciplinaCadastroComponent, DisciplinaListaComponent, DisciplinaComponent, AssociarDisciplinaCursoComponent
    ],
    providers: [DisciplinaService]
})

export class DisciplinaModule{

}
