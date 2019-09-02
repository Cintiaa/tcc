import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisciplinaCadastroComponent } from './disciplina-cadastro/disciplina-cadastro.component';
import { DisciplinaComponent } from './disciplina.component';
import { AssociarDisciplinaCursoComponent } from './associar-disciplina-curso/associar-disciplina-curso.component';

export const DisciplinaRoutes: Routes = [
  {
    path: 'disciplina',
    component: DisciplinaComponent,
    data: {
        title: 'Disciplina'
    },
  },
  {
    path: 'disciplina/new',
    component: DisciplinaCadastroComponent
  },
  {
    path: 'disciplina/:index',
    component: DisciplinaCadastroComponent
  },
  {
    path: 'disciplina/addCurso/:index',
    component: AssociarDisciplinaCursoComponent
  }
];


@NgModule({
    imports: [RouterModule.forChild(DisciplinaRoutes)],
    exports: [RouterModule]
})
export class DisciplinaRoutingModule { }
