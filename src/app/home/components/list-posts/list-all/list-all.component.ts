import { Region } from './../../../../models/region';
import { Category } from './../../../../models/category';
import { CategoryService } from './../../../../services/category.service';
import { RegionService } from './../../../../services/region.service';
import { Observable } from 'rxjs';
import { SearchService } from './../../../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss'],
})
export class ListAllComponent implements OnInit {
  listPost$: Observable<List<Post>>;
  categories: Category[];
  regions: Region[];
  selectedRegionId: number = null;
  selectedCategoryId: number = null;
  keyword: string;
  constructor(
    private searchService: SearchService,
    private regionService: RegionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.listPost$ = this.searchService.listPost$;
    this.searchService.searchAll();
    this.regionService.getRegions().subscribe((next) => {
      this.regions = next;
    });
    this.categoryService.getCategories().subscribe((next) => {
      this.categories = next;
    });
  }

  handleSubmit() {
    this.searchService.searchAll({
      categoryId: this.selectedCategoryId,
      regionId: this.selectedRegionId,
      keyword: this.keyword,
    });
  }
}
