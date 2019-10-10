import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { CursoRoutingModule } from './curso.routing.module';
import { CursoComponent } from './curso.component';
import { CursoCadastroComponent } from './curso-cadastro/curso-cadastro.component';
import { CursoListaComponent } from './curso-lista/curso-lista.component';
import { AssociarCursoDisciplinaComponent } from './associar-curso-disciplina/associar-curso-disciplina.component';
import { HttpClientModule } from '@angular/common/http';
import { CursoService } from '../services/curso.service';

@NgModule({
  imports: [
    CommonModule,
    CursoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  exports: [CursoCadastroComponent, CursoListaComponent],
  declarations: [CursoCadastroComponent, CursoListaComponent, CursoComponent, AssociarCursoDisciplinaComponent],
  providers: [HttpClientModule, CursoService]
})

export class CursoModule {

}
