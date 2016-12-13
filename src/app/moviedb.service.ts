import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { IMediaItem } from './media-item-interface';

@Injectable()
export class MoviedbService {
  constructor(private http: Http) { }
  apiKey: string = 'xxx';

  searchForMovie(searchTerm: string): Observable<IMediaItem[]> {
    var url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${searchTerm}&include_adult=false`;

    return this.http.get(url)
      .map((response: Response) => response.json().results)
      .map((x: Array<any>) => {
        let results: IMediaItem[] = [];
        x.forEach(y => {
          var result: IMediaItem = {
            mediaType: 'movie',
            id: y.id,
            title: y.title,
            date: y.release_date,
            backdropPath: y.backdrop_path
          };
          results.push(result);
        });
        return results;
      });
  }

  searchForTv(searchTerm: string): Observable<IMediaItem[]> {
    var url = `https://api.themoviedb.org/3/search/tv?api_key=${this.apiKey}&language=en-US&query=${searchTerm}`;
    return this.http.get(url)
      .map((response: Response) => response.json().results)
      .map((x: Array<any>) => {
        let results: IMediaItem[] = [];
        x.forEach(y => {
          var result: IMediaItem = {
            mediaType: 'tv',
            id: y.id,
            title: y.name,
            date: y.first_air_date,
            backdropPath: y.backdrop_path
          };
          results.push(result);
        });
        return results;
      });
  }

  getCredits(item: IMediaItem) {
    if (item.mediaType === 'movie') {
      return this.getMovieCredits(item.id);
    }
    else {
      return this.getTvCredits(item.id);
    }
  }

  getMovieCredits(movieId: number): any {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  getTvCredits(tvId: number): any {
    return this.http.get(`https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${this.apiKey}`);
  }
}
