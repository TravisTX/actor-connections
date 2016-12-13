import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../moviedb.service';

@Component({
  selector: 'by-title',
  templateUrl: './by-title.component.html',
  styleUrls: ['./by-title.component.css']
})
export class ByTitleComponent implements OnInit {
  constructor(private moviedbService: MoviedbService) { }
  aMovie = undefined;
  aMovieAllCast = [];
  aMovieOnlyCast = [];
  bMovie = undefined;
  bMovieAllCast = [];
  bMovieOnlyCast = [];

  sharedCast = [];

  ngOnInit() {
  }

  selectMovie(movieSlot: string, movie: any): void {
    if (movieSlot === 'a') {
      this.aMovie = movie;
    }
    else {
      this.bMovie = movie;
    }

    this.moviedbService.getCredits(movie).subscribe(
      data => {
        if (movieSlot === 'a') {
          this.aMovieAllCast = data.json().cast;
          this.updateCast();
        }
        else {
          this.bMovieAllCast = data.json().cast;
          this.updateCast();
        }
      }
    );
  }

  updateCast(): void {
    this.aMovieOnlyCast = this.aMovieAllCast.filter(a => 
      !this.bMovieAllCast.some(b => b.id === a.id) 
    );
    this.bMovieOnlyCast = this.bMovieAllCast.filter(b => 
      !this.aMovieAllCast.some(a => a.id === b.id) 
    );
    this.sharedCast = this.aMovieAllCast.filter(a => 
      this.bMovieAllCast.some(b => b.id === a.id) 
    );
  }

}
