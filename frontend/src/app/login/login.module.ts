import { AuthService } from './../services/auth.service';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { LoginRoutingModule } from './login.routing.module';


@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule ,
        ToastrModule.forRoot()
    ],
    exports: [],
    declarations: [],
    providers: [HttpClientModule, AuthGuard, AuthService ]
})

export class LoginModule{

}