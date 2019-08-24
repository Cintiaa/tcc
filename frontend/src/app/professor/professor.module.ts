import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorRoutingModule } from './professor.routing.module';
import { ProfessorCadastroComponent } from './professor-cadastro/professor-cadastro.component';

@NgModule({
    imports: [
        CommonModule,
        ProfessorRoutingModule
    ],
    exports: [],
    declarations: [ProfessorCadastroComponent],
    providers: []
})

export class ProfessorModule{

}