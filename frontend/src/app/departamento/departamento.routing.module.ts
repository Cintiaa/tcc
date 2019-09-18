import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartamentoComponent } from './departamento.component';
import { DepartamentoListaComponent } from './departamento-lista/departamento-lista.component';
import { DepartamentoCadastroComponent } from './departamento-cadastro/departamento-cadatastro.component';

export const DepartamentoRoutes: Routes = [
    {
        path: 'departamento',
        component: DepartamentoComponent,
        data: {
            title: 'Departamento'
        },
    },
    {
        path: 'newDepartamento',
        component: DepartamentoCadastroComponent,
    },
     {
         path: 'buscar',
         component: DepartamentoListaComponent,
     },
     {
         path: ':id/editar',
         component: DepartamentoCadastroComponent,
     },

];

@NgModule({
    imports: [RouterModule.forChild(DepartamentoRoutes)],
    exports: [RouterModule]
})
export class DepartamentoRoutingModule { }