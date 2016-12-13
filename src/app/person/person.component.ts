import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  constructor() { }

  @Input()
  person = undefined;

  ngOnInit() {
  }

}
