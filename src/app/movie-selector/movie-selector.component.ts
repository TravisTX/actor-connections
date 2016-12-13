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
  movie = undefined;
  @Output()
  onSelected = new EventEmitter<boolean>();
  movieSearch = '';
  searchResults = [];

  ngOnInit() {
  }

  searchChange(event): void {
    this.moviedbService.searchForMovie(event).subscribe(
      data => {
        this.searchResults = data.json().results;
      }
    )
  }

  selectMovie(movie): void {
    this.movie = movie;
    this.searchResults.length = 0;
    this.movieSearch = '';
    this.onSelected.emit(this.movie);
  }
}
