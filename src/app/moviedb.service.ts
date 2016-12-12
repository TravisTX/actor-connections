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

}
