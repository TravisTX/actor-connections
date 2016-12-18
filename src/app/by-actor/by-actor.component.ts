import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../moviedb.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { IMediaItem } from '../media-item-interface';

@Component({
  selector: 'by-actor',
  templateUrl: './by-actor.component.html',
  styleUrls: ['./by-actor.component.css']
})
export class ByActorComponent implements OnInit {
  constructor(
    private moviedbService: MoviedbService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  aActor = undefined;
  aActorAllMedia = [];
  aActorOnlyMedia = [];
  bActor = undefined;
  bActorAllMedia = [];
  bActorOnlyMedia = [];
  sharedMedia = [];

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.selectActorByParamString('a', params['a']);
        this.selectActorByParamString('b', params['b']);
      });
  }
  private selectActorByParamString(actorSlot: string, actorParam: string): void {
    if (!actorParam) return;
    this.moviedbService.getActor(+actorParam).subscribe(
      data => {
        this.selectActor(actorSlot, data);
      }
    )
  }

  onSelectActor(actorSlot: string, id: number) {
    if (actorSlot === 'a') {
      this.router.navigate(['.', { a: id, b: this.route.snapshot.params['b'] }], { relativeTo: this.route });
    }
    else {
      this.router.navigate(['.', { a: this.route.snapshot.params['a'], b: id }], { relativeTo: this.route });
    }
  }

  private selectActor(actorSlot: string, actor: any): void {
    if (actorSlot === 'a') {
      this.aActor = actor;
    }
    else {
      this.bActor = actor;
    }

    this.moviedbService.getActorCredits(actor.id).subscribe(
      data => {
        if (actorSlot === 'a') {
          this.aActorAllMedia = data;
        }
        else {
          this.bActorAllMedia = data;
        }
        this.updateMedia();
      }
    );
  }

  updateMedia(): void {
    this.aActorOnlyMedia = this.aActorAllMedia.filter(a =>
      !this.bActorAllMedia.some(b => b.id === a.id)
    );
    this.bActorOnlyMedia = this.bActorAllMedia.filter(b =>
      !this.aActorAllMedia.some(a => a.id === b.id)
    );
    this.sharedMedia = this.aActorAllMedia.filter(a =>
      this.bActorAllMedia.some(b => b.id === a.id)
    );
  }

}
