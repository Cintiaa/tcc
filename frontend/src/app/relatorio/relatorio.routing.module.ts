import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioComponent } from './relatorio.component';

export const RelatorioRoutes: Routes = [
    {
        path: 'relatorio',
        component: RelatorioComponent,
        data: {
            title: 'Relatorio'
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(RelatorioRoutes)],
    exports: [RouterModule]
})
export class RelatorioRoutingModule { }