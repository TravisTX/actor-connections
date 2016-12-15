import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../moviedb.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { IMediaItem } from '../media-item-interface';


@Component({
  selector: 'by-media',
  templateUrl: './by-media.component.html',
  styleUrls: ['./by-media.component.css']
})
export class ByMediaComponent implements OnInit {
  constructor(
    private moviedbService: MoviedbService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  aMedia = undefined;
  aMediaAllCast = [];
  aMediaOnlyCast = [];
  bMedia = undefined;
  bMediaAllCast = [];
  bMediaOnlyCast = [];

  sharedCast = [];

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.selectMediaByParamString('a', params['a']);
        this.selectMediaByParamString('b', params['b']);
      });
  }

  private selectMediaByParamString(mediaSlot: string, mediaParam: string): void {
    if (!mediaParam) return;
    if (mediaParam.startsWith('movie')) {
      this.moviedbService.getMedia('movie', +mediaParam.substr(5)).subscribe(
        data => {
          this.selectMedia(mediaSlot, data);
        }
      )
    }
    else if (mediaParam.startsWith('tv')) {
      this.moviedbService.getMedia('tv', +mediaParam.substr(2)).subscribe(
        data => {
          this.selectMedia(mediaSlot, data);
        }
      )
    }
  }

  onSelectMedia(mediaSlot: string, mediaType: string, id: number) {
    if (mediaSlot === 'a') {
      this.router.navigate(['.', { a: mediaType + id, b: this.route.snapshot.params['b'] }], { relativeTo: this.route });
    }
    else {
      this.router.navigate(['.', { a: this.route.snapshot.params['a'], b: mediaType + id }], { relativeTo: this.route });
    }
  }

  private selectMedia(mediaSlot: string, media: IMediaItem): void {
    if (mediaSlot === 'a') {
      this.aMedia = media;
    }
    else {
      this.bMedia = media;
    }

    this.moviedbService.getCredits(media.mediaType, media.id).subscribe(
      data => {
        if (mediaSlot === 'a') {
          this.aMediaAllCast = data.json().cast;
        }
        else {
          this.bMediaAllCast = data.json().cast;
        }
        this.updateCast();
      }
    );
  }

  updateCast(): void {
    this.aMediaOnlyCast = this.aMediaAllCast.filter(a =>
      !this.bMediaAllCast.some(b => b.id === a.id)
    );
    this.bMediaOnlyCast = this.bMediaAllCast.filter(b =>
      !this.aMediaAllCast.some(a => a.id === b.id)
    );
    this.sharedCast = this.aMediaAllCast.filter(a =>
      this.bMediaAllCast.some(b => b.id === a.id)
    );
  }
}
