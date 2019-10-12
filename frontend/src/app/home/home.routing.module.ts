import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

import { AuthGuard } from '../login/auth.guard';



export const HomeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Home'
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(HomeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }