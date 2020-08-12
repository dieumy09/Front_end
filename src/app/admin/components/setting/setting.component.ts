import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../models/category';
import {PostTypeService} from '../../../services/post-type.service';
import {RegionService} from '../../../services/region.service';
import {PostType} from '../../../models/post-type';
import {Region} from '../../../models/region';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  categories: Category[];
  postTypes: PostType[];
  regions: Region[];

  constructor(
    private categoryService: CategoryService,
    private postTypeService: PostTypeService,
    private regionService: RegionService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getPostTypes();
    this.getRegions();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getPostTypes() {
    this.postTypeService.getPostTypes().subscribe(data => {
      this.postTypes = data;
    });
  }

  getRegions() {
    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });
  }
}
