import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoComponent } from './aluno.component';
import { AlunoListaComponent } from './aluno-lista/aluno-lista.component';
import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';



export const AlunoRoutes: Routes = [
    {
        path: 'aluno',
        component: AlunoComponent,
        data: {
            title: 'Aluno'
        },
    },
    {
        path: 'newAluno',
        component: AlunoCadastroComponent,
    },
    /*  {
         path: 'buscar',
         component: AlunoListaComponent,
     },
     {
         path: ':id/editar',
         component: AlunoCadastroComponent,
     }, */

];

@NgModule({
    imports: [RouterModule.forChild(AlunoRoutes)],
    exports: [RouterModule]
})
export class AlunoRoutingModule { }