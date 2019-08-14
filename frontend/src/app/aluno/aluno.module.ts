import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { AlunoListaComponent } from './aluno-lista/aluno-lista.component';
import { AlunoCadastroComponent } from './aluno-cadastro/aluno-cadastro.component';
import { AlunoRoutingModule } from './aluno.routing.module';


@NgModule({
    imports: [
        CommonModule,
        AlunoRoutingModule
    ],
    exports: [],
    declarations: [AlunoCadastroComponent],
    providers: []
})

export class AlunoModule{

}