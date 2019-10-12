import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { CadastroComponent } from './cadastro.component';


export const LoginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login'
        },
    
    },
    {
        path: 'cadastro',
        component: CadastroComponent,
        data: {
            title: 'cadastro'
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(LoginRoutes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }