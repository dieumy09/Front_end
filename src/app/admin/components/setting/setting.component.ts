import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../models/category';
import {PostTypeService} from '../../../services/post-type.service';
import {RegionService} from '../../../services/region.service';
import {PostType} from '../../../models/post-type';
import {Region} from '../../../models/region';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  categories: Category[];
  postTypes: PostType[];
  regions: Region[];
  categoryForm: FormGroup;
  postTypeForm: FormGroup;
  regionForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private postTypeService: PostTypeService,
    private regionService: RegionService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getPostTypes();
    this.getRegions();

    this.categoryForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]]
    });

    this.postTypeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]]
    });

    this.regionForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]]
    });
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

  onSubmitCategoryForm() {
    if (this.categoryForm.valid) {
      if (this.categoryForm.value.id) {
        this.categoryService.editCategory(this.categoryForm.value).subscribe(data => {
          location.reload();
        });
      } else {
        this.categoryService.createCategory(this.categoryForm.value).subscribe(data => {
          location.reload();
        });
      }
    }
  }

  updateCategory(id: number) {
    this.categoryService.getCategoryById(id).subscribe(data => {
      this.categoryForm.patchValue(data);
    });
  }

  deleteCategory(id: number) {
    if (confirm(`Bạn có muốn xóa danh mục có mã là ${id} không?`)) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        alert(`Bạn đã xóa danh mục có mã là ${id} thành công!`);
      }, () => {
        alert(`Bạn không thể xóa danh mục có mã là ${id}!`);
      });
    }
  }

  onSubmitPostTypeForm() {
    if (this.postTypeForm.valid) {
      if (this.postTypeForm.value.id) {
        this.postTypeService.editPostType(this.postTypeForm.value).subscribe(data => {
          location.reload();
        });
      } else {
        this.postTypeService.createPostType(this.postTypeForm.value).subscribe(data => {
          location.reload();
        });
      }
    }
  }

  updatePostType(id: number) {
    this.postTypeService.getPostTypeById(id).subscribe(data => {
      this.postTypeForm.patchValue(data);
    });
  }

  deletePostType(id: number) {
    if (confirm(`Bạn có muốn xóa loại bài đăng có mã là ${id} không?`)) {
      this.postTypeService.deletePostType(id).subscribe(() => {
        alert(`Bạn đã xóa loại bài đăng có mã là ${id} thành công!`);
      }, () => {
        alert(`Bạn không thể xóa loại bài đăng có mã là ${id}!`);
      });
    }
  }

  onSubmitRegionForm() {
    if (this.regionForm.valid) {
      if (this.regionForm.value.id) {
        this.regionService.editRegion(this.regionForm.value).subscribe(data => {
          location.reload();
        });
      } else {
        this.regionService.createRegion(this.regionForm.value).subscribe(data => {
          location.reload();
        });
      }
    }
  }

  updateRegion(id: number) {
    this.regionService.getRegionById(id).subscribe(data => {
      this.regionForm.patchValue(data);
    });
  }

  deleteRegion(id: number) {
    if (confirm(`Bạn có muốn xóa vùng miền có mã là ${id} không?`)) {
      this.regionService.deleteRegion(id).subscribe(() => {
        alert(`Bạn đã xóa vùng miền có mã là ${id} thành công!`);
      }, () => {
        alert(`Bạn không thể xóa vùng miền có mã là ${id}!`);
      });
    }
  }
}
