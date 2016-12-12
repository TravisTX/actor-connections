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

  ngOnInit(): void {
    console.log('init');
    this.moviedbService.getTestMovie().subscribe(
      data => this.movie = data.json()
      
    )
  }

}
