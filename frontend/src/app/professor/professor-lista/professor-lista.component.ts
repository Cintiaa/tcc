import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professor-lista',
  templateUrl: './professor-lista.component.html',
  styleUrls: ['./professor-lista.component.css']
})
export class ProfessorListaComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
