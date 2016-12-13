import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MoviedbService } from '../moviedb.service';


@Component({
  selector: 'movie-selector',
  templateUrl: './movie-selector.component.html',
  styleUrls: ['./movie-selector.component.css']
})
export class MovieSelectorComponent implements OnInit {
  constructor(private moviedbService: MoviedbService) { }

  @Input()
  selectedItem = undefined;
  @Output()
  onSelected = new EventEmitter<boolean>();
  query = '';
  queryChanged: Subject<string> = new Subject<string>();

  movieSearchResults = [];
  tvSearchResults = [];

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
    this.moviedbService.searchForMovie(text).subscribe(
      data => {
        this.movieSearchResults = data;
      }
    )
    this.moviedbService.searchForTv(text).subscribe(
      data => {
        this.tvSearchResults = data;
      }
    )
  }

  selectItem(item): void {
    this.selectedItem = item;
    this.movieSearchResults.length = 0;
    this.tvSearchResults.length = 0;
    this.query = '';
    this.onSelected.emit(item);
  }
}
