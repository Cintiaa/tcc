import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';
import { FileSelectDirective } from 'ng2-file-upload';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatMenuModule } from '@angular/material/menu';
import { JwtModule } from '@auth0/angular-jwt';


import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';
import { AlunoModule } from './aluno/aluno.module';
import { AlunoComponent } from './aluno/aluno.component';
import { ProfessorModule } from './professor/professor.module';
import { ProfessorComponent } from './professor/professor.component';
import { AppRoutingModule } from './app.routing.module';
import { CursoModule } from './curso/curso.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { FooterComponent } from './footer/footer.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { DepartamentoModule } from './departamento/departamento.module';
import { TurmaComponent } from './turma/turma.component';
import { TurmaModule } from './turma/turma.module';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioModule } from './relatorio/relatorio.module';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { UsuarioModule } from './usuarios/usuario.module';
import { HomeModule } from './home/home.module';
import { CadastroComponent } from './login/cadastro.component';


//import { AppRoutes } from './app.routing.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    ProfessorComponent,
    HomeComponent,
    ProfessorComponent,
    MenuComponent,
    FooterComponent,
    DepartamentoComponent,
    TurmaComponent,
    UsuarioComponent,
    CadastroComponent,
    LoginComponent,
    RelatorioComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularFontAwesomeModule,
    LayoutModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HomeModule,
    AlunoModule,
    LoginModule,
    ProfessorModule,
    CursoModule,
    DisciplinaModule,
    DepartamentoModule,
    TurmaModule,
    UsuarioModule,
    RelatorioModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/api/auth']
      }
    })
  ],

  providers: [ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
