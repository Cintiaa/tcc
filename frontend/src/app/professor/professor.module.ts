import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProfessorService } from './../services/professor.service';
import { ProfessorListaComponent } from './professor-lista/professor-lista.component';
import { ProfessorRoutingModule } from './professor.routing.module';
import { ProfessorCadastroComponent } from './professor-cadastro/professor-cadastro.component';
import { ProfessorDisciplinaComponent } from './professor-disciplina/professor-disciplina.component';



@NgModule({
    imports: [
        CommonModule,
        ProfessorRoutingModule,
        HttpClientModule,
        FormsModule,
        NgxPaginationModule,
        ReactiveFormsModule ,
        ToastrModule.forRoot()
    ],
    exports: [ProfessorCadastroComponent, ProfessorListaComponent, ProfessorDisciplinaComponent],
    declarations: [ProfessorCadastroComponent, ProfessorListaComponent, ProfessorDisciplinaComponent],
    providers: [HttpClientModule, ProfessorService]
})

export class ProfessorModule{}