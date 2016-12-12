import { Component, OnInit } from '@angular/core';
import { MoviedbService } from './moviedb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private moviedbService: MoviedbService) { }
  title = 'app works!';
  movie = undefined;
  movieResultsA = [];
  movieResultsB = [];

  ngOnInit(): void {
  }

  searchChange(movieSlot, event): void {
    var target = (movieSlot === 'a') ? this.movieResultsA : this.movieResultsB;
    this.moviedbService.searchForMovie(event.target.value).subscribe(
      data => {
        target.length = 0;
        target.push(...data.json().results);
      }
    )
  }

}
