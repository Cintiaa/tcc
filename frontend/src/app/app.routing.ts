import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AlunoComponent } from './aluno/aluno.component';
import { HomeComponent } from './home/home.component';
import { CursoCadastroComponent } from './curso/curso-cadastro.component';
import { CursoListaComponent } from './curso/curso-lista/curso-lista.component';
import { AlunoListaComponent } from './aluno/aluno-lista/aluno-lista.component';
import { AlunoCadastroComponent } from './aluno/aluno-cadastro/aluno-cadastro.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
]

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
