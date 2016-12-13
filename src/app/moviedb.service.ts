import { Injectable } from '@angular/core';
import { Http }    from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class MoviedbService {
  constructor(private http: Http) { }
  apiKey: string = 'xxx';

  getTestMovie(): any {
    return this.http.get(`https://api.themoviedb.org/3/movie/550?api_key=${this.apiKey}`);
  }

  searchForMovie(searchTerm: string): any {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${searchTerm}&include_adult=false`);
  }

  getCredits(movieId: number): any {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }


}
