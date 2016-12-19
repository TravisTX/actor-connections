import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MoviedbService } from '../moviedb.service';


@Component({
  selector: 'media-selector',
  templateUrl: './media-selector.component.html',
  styleUrls: ['./media-selector.component.css']
})
export class MediaSelectorComponent implements OnInit {
  constructor(private moviedbService: MoviedbService) { }

  @Input()
  selectedItem = undefined;
  @Input()
  placeholder = '';
  @Output()
  onSelected = new EventEmitter<boolean>();
  query = '';
  queryChanged: Subject<string> = new Subject<string>();
  showPopup = false;
  public searchFocusEventEmitter = new EventEmitter<boolean>();

  mediaSearchResults = [];

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
    this.moviedbService.searchForMedia(text).subscribe(
      data => {
        this.mediaSearchResults = data;
      }
    )
  }

  doShowPopup(): void {
    document.getElementsByTagName("body")[0].classList.add("popup-open");
    this.showPopup = true;
    setTimeout(() => {
      console.log('focus');
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
    this.mediaSearchResults.length = 0;
    this.query = '';
    this.onSelected.emit(item);
  }
}
