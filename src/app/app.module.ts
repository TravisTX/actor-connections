import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MoviedbService } from './moviedb.service';
import { MovieSelectorComponent } from './movie-selector/movie-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MoviedbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
