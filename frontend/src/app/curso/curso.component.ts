import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.css']
})
export class CursoComponent {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  onAdicionar() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
