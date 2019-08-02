import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoComponent } from './aluno/aluno.component';
import { HomeComponent } from './home/home.component';


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
]

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
