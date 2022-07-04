import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  enteredSearchValue: string = '';

  @Output()
  searchTextChanges: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChange(){
    this.searchTextChanges.emit(this.enteredSearchValue);
  }

}