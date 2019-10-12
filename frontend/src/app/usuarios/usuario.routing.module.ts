import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioComponent } from './usuario.component';


export const UsuarioRoutes: Routes = [
    {
        path: 'usuario',
        component: UsuarioComponent,
        data: {
            title: 'Usuario'
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(UsuarioRoutes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule { }