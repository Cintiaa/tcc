import { Component, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Observable } from 'rxjs';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Home';

  constructor(
    private auth: UsuarioService,
    private router: Router
  ) { }


  @Output() logout = new EventEmitter();

  deslogar(e) {
    this.logout.emit(e);
    this.auth.logout();
    this.router.navigate(['login']);
  }


  /* constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'hamIcon',
        sanitizer.bypassSecurityTrustResourceUrl('assets/ham.svg'));
  
      }
 */
  /* isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver) { } */
}
