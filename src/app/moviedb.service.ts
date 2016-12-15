import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { IMediaItem } from './media-item-interface';

@Injectable()
export class MoviedbService {
  constructor(private http: Http) { }
  apiKey: string = 'xxx';

  getMedia(type: string, id: number): Observable<IMediaItem> {
    if (type === 'movie') {
      return this.getMovie(id);
    }
    else {
      return this.getTv(id);
    }
  }

  searchForMovie(searchTerm: string): Observable<IMediaItem[]> {
    var url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${searchTerm}&include_adult=false`;

    return this.http.get(url)
      .map((response: Response) => response.json().results)
      .map((x: Array<any>) => {
        let results: IMediaItem[] = [];
        x.forEach(y => {
          results.push(this.convertMovieToMedia(y));
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
          results.push(this.convertTvToMedia(y));
        });
        return results;
      });
  }

  getCredits(mediaType: string, id: number) {
    if (mediaType === 'movie') {
      return this.getMovieCredits(id);
    }
    else {
      return this.getTvCredits(id);
    }
  }

  private convertMovieToMedia(movie: any): IMediaItem {
    var result: IMediaItem = {
      mediaType: 'movie',
      id: movie.id,
      title: movie.title,
      date: movie.release_date,
      backdropPath: movie.backdrop_path
    };
    return result;
  }

  private convertTvToMedia(tv: any): IMediaItem {
    var result: IMediaItem = {
      mediaType: 'tv',
      id: tv.id,
      title: tv.name,
      date: tv.first_air_date,
      backdropPath: tv.backdrop_path
    };
    return result;
  }

  private getMovie(id: number): Observable<IMediaItem> {
    var url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .map((x: any) => {
        return this.convertMovieToMedia(x);
      });
  }

  private getTv(id: number): Observable<IMediaItem> {
    var url = `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}`;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .map((x: any) => {
        return this.convertTvToMedia(x);
      });
  }

  private getMovieCredits(movieId: number): any {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  private getTvCredits(tvId: number): any {
    return this.http.get(`https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${this.apiKey}`);
  }
}
