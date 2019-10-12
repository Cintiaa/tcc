import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { UsuarioComponent } from './usuario.component';
import { UsuarioRoutingModule } from './usuario.routing.module';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';



@NgModule({
    imports: [
        CommonModule,
        UsuarioRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule ,
        ToastrModule.forRoot()
    ],
    exports: [UsuarioCadastroComponent],
    declarations: [UsuarioCadastroComponent],
    providers: [HttpClientModule ]
})

export class UsuarioModule{

}