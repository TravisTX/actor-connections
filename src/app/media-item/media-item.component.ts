import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent implements OnInit {

  constructor() { }

  @Input()
  item = undefined;

  ngOnInit() {
  }

}
