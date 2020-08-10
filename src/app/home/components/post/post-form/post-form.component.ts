import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user';
import {UserService} from '../../../../services/user.service';
import {Category} from '../../../../models/category';
import {CategoryService} from '../../../../services/category.service';
import {Region} from '../../../../models/region';
import {RegionService} from '../../../../services/region.service';
import {PostType} from '../../../../models/post-type';
import {PostTypeService} from '../../../../services/post-type.service';
import {Direction} from '../../../../models/direction';
import {DirectionService} from '../../../../services/direction.service';
import {FormBuilder, Validators} from '@angular/forms';
import {PostService} from '../../../../services/post.service';
import {PostDataService} from '../post-data.service';
import {Router} from '@angular/router';
import {Post} from '../../../../models/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  user: User;
  categories: Category[];
  regions: Region[];
  postTypes: PostType[];
  directions: Direction[];
  postData: Post;
  listImages = [];
  fileImages = [];
  checkValidPostImage = false;

  postForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    condition: [],
    address: ['', [Validators.required, Validators.maxLength(100)]],
    region: [],
    area: ['', [Validators.required, Validators.pattern('^[0-9]+(,)?[0-9]+$'), Validators.min(0)]],
    price: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(0)]],
    deal: [],
    content: ['', [Validators.required, Validators.maxLength(65535)]],
    user: [],
    category: [],
    postType: [],
    direction: [],
    customerType: [],
    viewCount: [0],
  });

  constructor(
    private postService: PostService,
    private userService: UserService,
    private categoryService: CategoryService,
    private regionService: RegionService,
    private postTypeService: PostTypeService,
    private directionService: DirectionService,
    private formBuilder: FormBuilder,
    private postDataService: PostDataService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getCategories();
    this.getRegions();
    this.getPostTypes();
    this.getDirections();
    this.getPostData();
  }

  getUser() {
    this.userService.getUserById(1).subscribe(data => {
      this.user = data;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getRegions() {
    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });
  }

  getPostTypes() {
    this.postTypeService.getPostTypes().subscribe(data => {
      this.postTypes = data;
    });
  }

  getDirections() {
    this.directionService.getDirections().subscribe(data => {
      this.directions = data;
    });
  }

  getPostData() {
    if (this.postDataService.postData !== undefined) {
      this.postData = this.postDataService.postData;
      this.postForm.patchValue(this.postData);
      this.listImages = this.postDataService.listImages;
      this.fileImages = this.postDataService.fileImages;
    }
  }

  addImage(event) {
    if (event.target.files) {
      const selectFile = event.target.files;
      for (let i = 0; i < selectFile.length; i++) {
        this.fileImages.push(event.target.files[i]);
        const reader = new FileReader();
        reader.onload = (data: any) => {
          this.listImages.push(data.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  submit() {
    this.validPostImage();
    if (this.postForm.valid && !this.checkValidPostImage) {
      this.postForm.patchValue({
        user: this.user,
      });
      this.postDataService.addPostData(this.postForm.value, this.listImages, this.fileImages);
      this.router.navigateByUrl(`/post-confirm`);
    }
  }

  validPostImage() {
    if (this.postForm.value.postType !== null) {
      if (this.postForm.value.postType.id === 2 || this.postForm.value.postType.id === 3) {
        const lengthOfListImages = this.listImages.length;
        this.checkValidPostImage = lengthOfListImages < 5;
      } else {
        this.checkValidPostImage = false;
      }
    }
  }

  backToHome() {
    this.postDataService.postData = undefined;
    this.router.navigateByUrl('/');
  }
}
