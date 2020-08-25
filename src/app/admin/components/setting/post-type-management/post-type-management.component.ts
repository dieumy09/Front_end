import {Component, OnInit} from '@angular/core';
import {PostType} from '../../../../models/post-type';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostTypeService} from '../../../../services/post-type.service';

@Component({
  selector: 'app-post-type-management',
  templateUrl: './post-type-management.component.html',
  styleUrls: ['./post-type-management.component.scss']
})
export class PostTypeManagementComponent implements OnInit {
  postTypes: PostType[];
  postTypeForm: FormGroup;
  page: number;

  constructor(
    private formBuilder: FormBuilder,
    private postTypeService: PostTypeService
  ) {
  }

  ngOnInit(): void {
    this.getPostTypes();

    this.postTypeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]]
    });
  }

  getPostTypes() {
    this.postTypeService.getPostTypes().subscribe(data => {
      this.postTypes = data;
    });
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

}
