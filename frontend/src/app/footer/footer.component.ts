import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  
  @Output() logout = new EventEmitter();

  deslogar(e) {
    this.logout.emit(e);
  }
}