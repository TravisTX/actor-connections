import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../moviedb.service';

@Component({
  selector: 'by-title',
  templateUrl: './by-title.component.html',
  styleUrls: ['./by-title.component.css']
})
export class ByTitleComponent implements OnInit {
  constructor(private moviedbService: MoviedbService) { }
  movieA = undefined;
  movieB = undefined;

  ngOnInit() {
  }

}
