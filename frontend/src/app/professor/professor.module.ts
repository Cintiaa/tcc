import { HttpClientModule } from '@angular/common/http';
import { ToasterService, ToasterModule } from 'angular2-toaster';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

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
        ReactiveFormsModule ,
        ToasterModule.forRoot()
    ],
    exports: [ProfessorCadastroComponent, ProfessorListaComponent, ProfessorDisciplinaComponent],
    declarations: [ProfessorCadastroComponent, ProfessorListaComponent, ProfessorDisciplinaComponent],
    providers: [HttpClientModule, ProfessorService, ToasterService]
})

export class ProfessorModule{}