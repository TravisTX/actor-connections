import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MoviedbService } from '../moviedb.service';


@Component({
  selector: 'actor-selector',
  templateUrl: './actor-selector.component.html',
  styleUrls: ['./actor-selector.component.css']
})
export class ActorSelectorComponent implements OnInit {
  constructor(private moviedbService: MoviedbService) { }

  @Input()
  placeholder = '';
  @Input()
  selectedItem = undefined;
  @Output()
  onSelected = new EventEmitter<boolean>();
  query = '';
  queryChanged: Subject<string> = new Subject<string>();

  actorSearchResults = [];

  ngOnInit() {
    this.queryChanged
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .subscribe(model => {
        this.query = model;
        this.searchChange(this.query)
      });
  }

  searchChange(text): void {
    if (text.length === 0) {
      return;
    }
    this.moviedbService.searchForActor(text).subscribe(
      data => {
        this.actorSearchResults = data;
      }
    )
  }

  selectItem(item): void {
    this.selectedItem = item;
    this.actorSearchResults.length = 0;
    this.query = '';
    this.onSelected.emit(item);
  }

}
