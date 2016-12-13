import { Component, OnInit } from '@angular/core';
import { MoviedbService } from './moviedb.service';
import { MovieSelectorComponent } from './movie-selector/movie-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private moviedbService: MoviedbService) { }
  movieA = undefined;
  movieB = undefined;

  ngOnInit(): void {
  }


}
