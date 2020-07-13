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
  categories: Category[];
  regions: Region[];
  selectedRegionId: number = null;
  selectedCategoryId: number = null;
  keyword: string;
  currentPage = 0;
  listPost: List<Post>;
  constructor(
    private searchService: SearchService,
    private regionService: RegionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.searchService.listPost$.subscribe((next) => {
      this.listPost = next;
    });
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

  handleClickNext() {
    if (this.listPost.number === this.listPost.totalPages - 1) {
      this.searchService.jumpToPage(0);
    } else {
      this.searchService.jumpToPage(this.listPost.number + 1);
    }
  }

  handleClickPrevious() {
    if (this.listPost.number === 0) {
      this.searchService.jumpToPage(this.listPost.totalPages - 1);
    } else {
      this.searchService.jumpToPage(this.listPost.number - 1);
    }
  }

  jumpToPage(page) {
    this.searchService.jumpToPage(page - 1);
  }
}
