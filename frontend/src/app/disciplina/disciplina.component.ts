import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.css']
})
export class DisciplinaComponent {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  onAdicionar() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
