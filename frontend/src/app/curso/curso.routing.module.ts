import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursoCadastroComponent } from './curso-cadastro/curso-cadastro.component';
import { CursoComponent } from './curso.component';
import { AssociarCursoDisciplinaComponent } from './associar-curso-disciplina/associar-curso-disciplina.component';

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
  },
  {
    path: 'curso/addDisciplina/:index',
    component: AssociarCursoDisciplinaComponent
  }
];


@NgModule({
    imports: [RouterModule.forChild(CursoRoutes)],
    exports: [RouterModule]
})
export class CursoRoutingModule { }
