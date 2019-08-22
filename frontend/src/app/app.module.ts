import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';
import { AlunoModule } from './aluno/aluno.module';
import { AlunoComponent } from './aluno/aluno.component';
import { ProfessorModule } from './professor/professor.module';
import { ProfessorComponent } from './professor/professor.component';
import { CursoCadastroComponent } from './curso/curso-cadastro.component';
import { CursoListaComponent } from './curso/curso-lista/curso-lista.component';
import { AppRoutingModule } from './app.routing.module';

//import { AppRoutes } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    ProfessorComponent,
    HomeComponent,
    ProfessorComponent,
    MenuComponent,
    CursoCadastroComponent,
    CursoListaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    LayoutModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    AlunoModule,
    ProfessorModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
