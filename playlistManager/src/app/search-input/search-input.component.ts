import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  searchInput: string  = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearch(): void {
    console.log("Search input: ", this.searchInput);
    const navigationExtras: NavigationExtras = {state: {searchInput: this.searchInput}};
    this.router.navigate(['/searchList'], navigationExtras)
    this.searchInput = "";
  }

}
