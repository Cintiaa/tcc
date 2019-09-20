import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurmaComponent } from './turma.component';
import { TurmaCadastroComponent } from './turma-cadastro/turma-cadastro.component';
import { TurmaListaComponent } from './turma-lista/turma-lista.component';



export const TurmaRoutes: Routes = [
    {
        path: 'turma',
        component: TurmaComponent,
        data: {
            title: 'Turma'
        },
    },
    {
        path: 'newTurma',
        component: TurmaCadastroComponent,
    },
     {
         path: 'buscar',
         component: TurmaListaComponent,
     },
     {
         path: ':id/editar',
         component: TurmaCadastroComponent,
     },

];

@NgModule({
    imports: [RouterModule.forChild(TurmaRoutes)],
    exports: [RouterModule]
})
export class TurmaRoutingModule { }