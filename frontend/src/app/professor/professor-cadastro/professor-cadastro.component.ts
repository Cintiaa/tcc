import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professor-cadastro',
  templateUrl: './professor-cadastro.component.html',
  styleUrls: ['./professor-cadastro.component.css']
})
export class ProfessorCadastroComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
