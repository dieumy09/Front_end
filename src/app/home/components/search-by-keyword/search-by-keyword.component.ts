import { SearchService } from './../../../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-by-keyword',
  templateUrl: './search-by-keyword.component.html',
  styleUrls: ['./search-by-keyword.component.scss'],
})
export class SearchByKeywordComponent implements OnInit {
  keyword: string;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  handleSearch(): void {
    this.searchService.searchAll({
      keyword: this.keyword,
    });
  }
}
