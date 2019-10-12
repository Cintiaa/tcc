import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: UsuarioService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) { }

  title = 'Home';
  logout = false;

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  @Output() logado = new EventEmitter();

  ngOnInit() {
  }

  deslogar(e) {
    this.logout = true;
    this.auth.logout();
    this.router.navigate(['login'], { relativeTo: this.route });
  }

}
