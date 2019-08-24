import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { CursoRoutingModule } from './curso.routing.module';
import { CursoComponent } from './curso.component';
import { CursoCadastroComponent } from './curso-cadastro/curso-cadastro.component';
import { CursoListaComponent } from './curso-lista/curso-lista.component';

@NgModule({
    imports: [
        CommonModule,
        CursoRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [],
    declarations: [
      CursoCadastroComponent,
      CursoListaComponent,
      CursoComponent
    ],
    providers: []
})

export class CursoModule{

}
