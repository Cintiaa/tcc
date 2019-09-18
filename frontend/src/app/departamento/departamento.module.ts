import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { CursoService } from '../services/curso.service';
import { UtilsService } from '../services/utils.service';
import { DepartamentoRoutingModule } from './departamento.routing.module';
import { DepartamentoCadastroComponent } from './departamento-cadastro/departamento-cadatastro.component';
import { DepartamentoListaComponent } from './departamento-lista/departamento-lista.component';
import { DepartamentoService } from '../services/departamento.service';

@NgModule({
    imports: [
        CommonModule,
        DepartamentoRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule ,
        ToastrModule.forRoot()
    ],
    exports: [DepartamentoCadastroComponent, DepartamentoListaComponent],
    declarations: [DepartamentoCadastroComponent, DepartamentoListaComponent],
    providers: [HttpClientModule, DepartamentoService, CursoService, UtilsService ]
})

export class DepartamentoModule{

}