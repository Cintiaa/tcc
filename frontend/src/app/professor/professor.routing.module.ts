import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProfessorComponent } from './professor.component';
import { ProfessorCadastroComponent } from './professor-cadastro/professor-cadastro.component';

export const ProfessorRoutes: Routes = [
    {
        path: 'professor',
        component: ProfessorComponent,
        data: {
            title: 'Professor'
        },
    },
    {
        path: 'newProfessor',
        component: ProfessorCadastroComponent,
    },
    /*  {
         path: 'buscar',
         component: ProfessorListaComponent,
     },
     {
         path: ':id/editar',
         component: ProfessorCadastroComponent,
     }, */

];

@NgModule({
    imports: [RouterModule.forChild(ProfessorRoutes)],
    exports: [RouterModule]
})
export class ProfessorRoutingModule { }