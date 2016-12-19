import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MoviedbService } from '../moviedb.service';


@Component({
  selector: 'actor-selector',
  templateUrl: './actor-selector.component.html',
  styleUrls: ['./actor-selector.component.css']
})
export class ActorSelectorComponent implements OnInit {
  constructor(private moviedbService: MoviedbService) { }

  @Input()
  placeholder = '';
  @Input()
  selectedItem = undefined;
  @Output()
  onSelected = new EventEmitter<boolean>();
  query = '';
  queryChanged: Subject<string> = new Subject<string>();
  showPopup = false;
  public searchFocusEventEmitter = new EventEmitter<boolean>();

  actorSearchResults = [];

  ngOnInit() {
    this.queryChanged
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .subscribe(model => {
        this.query = model;
        this.searchChange(this.query)
      });
  }

  searchChange(text): void {
    if (text.length === 0) {
      return;
    }
    this.moviedbService.searchForActor(text).subscribe(
      data => {
        this.actorSearchResults = data;
      }
    )
  }

  doShowPopup(): void {
    document.getElementsByTagName("body")[0].classList.add("popup-open");
    this.showPopup = true;
    setTimeout(() => {
      this.searchFocusEventEmitter.emit(true);
    }, 0);
  }

  doHidePopup(): void {
    document.getElementsByTagName("body")[0].classList.remove("popup-open");
    this.showPopup = false;
  }

  selectItem(item): void {
    this.doHidePopup();
    this.selectedItem = item;
    this.actorSearchResults.length = 0;
    this.query = '';
    this.onSelected.emit(item);
  }

}
