import { RelatorioListaComponent } from './relatorio-lista/relatorio-lista.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToasterService, ToasterModule } from 'angular2-toaster';


import { RelatorioRoutingModule } from './relatorio.routing.module';
import { RelatorioService } from '../services/relatorio.service';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RelatorioRoutingModule,
        ToasterModule.forRoot()
    ],
    exports: [RelatorioListaComponent],
    declarations: [RelatorioListaComponent],
    providers: [HttpClientModule, ToasterService, RelatorioService]
})

export class RelatorioModule{}