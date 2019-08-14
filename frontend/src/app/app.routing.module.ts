import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CursoCadastroComponent } from './curso/curso-cadastro.component';
import { CursoListaComponent } from './curso/curso-lista/curso-lista.component';



export const AppRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'curso',
        component: CursoListaComponent,
        data: {
            title: 'Curso'
        },
    },
    {
      path: 'newCurso',
      component: CursoCadastroComponent
    },
]
@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}