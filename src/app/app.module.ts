import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MoviedbService } from './moviedb.service';
import { MediaSelectorComponent } from './media-selector/media-selector.component';
import { ByMediaComponent } from './by-media/by-media.component';
import { PersonComponent } from './person/person.component';
import { ByActorComponent } from './by-actor/by-actor.component';
import { ActorSelectorComponent } from './actor-selector/actor-selector.component';
import { MediaItemComponent } from './media-item/media-item.component';
import { FocusDirective } from './focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    MediaSelectorComponent,
    ByMediaComponent,
    PersonComponent,
    ByActorComponent,
    ActorSelectorComponent,
    MediaItemComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/by-media',
        pathMatch: 'full'
      },
      {
        path: 'by-media',
        component: ByMediaComponent
      },
      {
        path: 'by-actor',
        component: ByActorComponent
      }
    ])

  ],
  providers: [MoviedbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
