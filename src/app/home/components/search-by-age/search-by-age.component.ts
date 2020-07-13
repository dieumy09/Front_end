import { SearchService } from './../../../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-by-age',
  templateUrl: './search-by-age.component.html',
  styleUrls: ['./search-by-age.component.scss'],
})
export class SearchByAgeComponent implements OnInit {
  year: string;
  gender: boolean;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  handleSearchClick() {
    this.searchService.searchAll({
      year: this.year,
      gender: this.gender,
    });
  }
}
