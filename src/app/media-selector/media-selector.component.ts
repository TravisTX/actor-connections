import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MoviedbService } from '../moviedb.service';


@Component({
  selector: 'media-selector',
  templateUrl: './media-selector.component.html',
  styleUrls: ['./media-selector.component.css']
})
export class MediaSelectorComponent implements OnInit {
  constructor(private moviedbService: MoviedbService) { }

  @Input()
  selectedItem = undefined;
  @Output()
  onSelected = new EventEmitter<boolean>();
  query = '';
  queryChanged: Subject<string> = new Subject<string>();

  mediaSearchResults = [];

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
    this.moviedbService.searchForMedia(text).subscribe(
      data => {
        this.mediaSearchResults = data;
      }
    )
  }

  selectItem(item): void {
    this.selectedItem = item;
    this.mediaSearchResults.length = 0;
    this.query = '';
    this.onSelected.emit(item);
  }
}
