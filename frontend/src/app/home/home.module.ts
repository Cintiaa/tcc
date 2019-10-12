import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


import { HomeRoutingModule } from './home.routing.module';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
    ],
    exports: [],
    declarations: [],
    providers: [HttpClientModule]
})

export class HomeModule {

}