import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoComponent } from './aluno/aluno.component';
import { HomeComponent } from './home/home.component';
import { CursoCadastroComponent } from './curso/curso-cadastro.component';
import { CursoListaComponent } from './curso/curso-lista/curso-lista.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'aluno',
        component: AlunoComponent,
        data: {
            title: 'Aluno'
        }
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

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
