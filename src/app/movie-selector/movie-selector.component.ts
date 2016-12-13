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
  movieSearchResults = [];
  tvSearchResults = [];

  ngOnInit() {
  }

  searchChange(event): void {
    if (event.length === 0) {
      return;
    }
    this.moviedbService.searchForMovie(event).subscribe(
      data => {
        this.movieSearchResults = data;
      }
    )
    this.moviedbService.searchForTv(event).subscribe(
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
