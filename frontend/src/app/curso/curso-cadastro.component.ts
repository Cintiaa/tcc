import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-curso-cadastro',
  templateUrl: './curso-cadastro.component.html',
  styleUrls: ['./curso-cadastro.component.css']
})
export class CursoCadastroComponent implements OnInit {
  id: string;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.id = params['id'];
    //       this.editMode = params['id'] != null;
    //     }
    //   );
  }

}
