import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoCadastroComponent } from './curso-cadastro/curso-cadastro.component';
import { CursoComponent } from './curso.component';

export const CursoRoutes: Routes = [
  {
    path: 'curso',
    component: CursoComponent,
    data: {
        title: 'Curso'
    },
  },
  {
    path: 'curso/new',
    component: CursoCadastroComponent
  },
  {
    path: 'curso/:index',
    component: CursoCadastroComponent
  }
];


@NgModule({
    imports: [RouterModule.forChild(CursoRoutes)],
    exports: [RouterModule]
})
export class CursoRoutingModule { }
