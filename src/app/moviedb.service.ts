import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { IMediaItem } from './media-item-interface';

@Injectable()
export class MoviedbService {
  constructor(private http: Http) { }
  apiKey: string = '57b3da7727ff12da1306508b6d09c419';

  getMedia(type: string, id: number): Observable<IMediaItem> {
    if (type === 'movie') {
      return this.getMovie(id);
    }
    else {
      return this.getTv(id);
    }
  }

  getActor(id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/person/${id}?api_key=${this.apiKey}`)
      .map((response: Response) => response.json());
  }

  searchForActor(searchTerm: string): Observable<any[]> {
    var url = `https://api.themoviedb.org/3/search/person?api_key=${this.apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;

    return this.http.get(url)
      .map((response: Response) => response.json().results)
  }

  searchForMedia(searchTerm: string): Observable<IMediaItem[]> {
    var url = `https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&language=en-US&query=${searchTerm}&include_adult=false`;

    return this.http.get(url)
      .map((response: Response) => response.json().results)
      .map((x: Array<any>) => {
        return x.filter(y => {
          return y.media_type === 'movie' || y.media_type === 'tv';
        });
      })
      .map((x: Array<any>) => {
        let results: IMediaItem[] = [];
        x.forEach(y => {
          results.push(this.convertToIMediaItem(y));
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

  getActorCredits(actorId: number): Observable<any[]> {
    var url = `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${this.apiKey}&language=en-US`;

    return this.http.get(url)
      .map((response: Response) => response.json().cast)
  }

  private convertToIMediaItem(movieDbItem: any): IMediaItem {
    var result: IMediaItem = {
      mediaType: movieDbItem.media_type,
      id: movieDbItem.id,
      title: movieDbItem.title || movieDbItem.name,
      date: movieDbItem.release_date || movieDbItem.first_air_date,
      backdropPath: movieDbItem.backdrop_path,
      posterPath: movieDbItem.poster_path,
    };
    return result;
  }

  private getMovie(id: number): Observable<IMediaItem> {
    var url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .map((x: any) => {
        x.media_type = 'movie';
        return this.convertToIMediaItem(x);
      });
  }

  private getTv(id: number): Observable<IMediaItem> {
    var url = `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}`;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .map((x: any) => {
        x.media_type = 'tv';
        return this.convertToIMediaItem(x);
      });
  }

  private getMovieCredits(movieId: number): any {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  private getTvCredits(tvId: number): any {
    return this.http.get(`https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${this.apiKey}`);
  }
}
