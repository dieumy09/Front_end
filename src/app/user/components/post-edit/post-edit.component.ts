import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {RegionService} from '../../../services/region.service';
import {Region} from '../../../models/region';
import {PostTypeService} from '../../../services/post-type.service';
import {PostType} from '../../../models/post-type';
import {Direction} from '../../../models/direction';
import {DirectionService} from '../../../services/direction.service';
import {PostImage} from '../../../models/post-image';
import {PostImageService} from '../../../services/post-image.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  editPostForm: FormGroup;
  post: Post;
  categories: Category[];
  regions: Region[];
  postTypes: PostType[];
  directions: Direction[];
  postImages: PostImage[];
  postId: number;
  selectedDirection: Direction;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private categoryService: CategoryService,
    private regionService: RegionService,
    private postTypeService: PostTypeService,
    private directionService: DirectionService,
    private postImageService: PostImageService
  ) { }

  ngOnInit(): void {
    this.editPostForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      condition: [''],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      area: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(0)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(0)]],
      deal: [''],
      viewCount: [''],
      content: ['', [Validators.required, Validators.maxLength(65535)]],
      status: [''],
      approved: [''],
      user: [ ],
      category: [this.formBuilder.group({
        id: [''],
        name: ['']
      })],
      postImage: [''],
      postType: [this.formBuilder.group({
        id: [''],
        name: ['']
      })],
      direction: [this.formBuilder.group({
        id: [''],
        name: ['']
      }) ],
      createdAt: [''],
      updatedAt: [''],
      region: [this.formBuilder.group({
        id: [''],
        name: ['']
      })],
      customerType: [ ]
    });

    this.getPost();
    this.getAllCategories();
    this.getAllDirections();
    this.getAllPostTypes();
    this.getAllRegions();
    this.getAllPostImages();

    console.log(this.editPostForm);
  }

  getPost() {
    this.activatedRoute.params.subscribe(next => {
      this.postId = next.id;
      this.postService.getPostById(this.postId).subscribe(data => {
        this.post = data;
        console.log(data);
        this.selectedDirection = data.direction;
        this.editPostForm.patchValue(data);
      });
    });
  }

  onSubmit() {
    if (this.editPostForm.valid) {
      this.postService.editPost(this.editPostForm.value, this.postId).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl(`/user/${data.user.id}`);
      });
    }
  }

  deletePostImage(image: PostImage) {
    if (confirm('Bạn có muốn xóa ảnh này không?')) {
      this.postImageService.deletePostImage(image.id).subscribe(() => {
        this.postImages = this.postImages.filter(img => img !== image);
      });
    }
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getAllRegions() {
    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });
  }

  getAllPostTypes() {
    this.postTypeService.getPostTypes().subscribe(data => {
      this.postTypes = data;
    });
  }

  getAllDirections() {
    this.directionService.getDirections().subscribe(data => {
      this.directions = data;
    });
  }

  getAllPostImages() {
    this.postImageService.getPostImages().subscribe(data => {
      this.postImages = data.content;
    });
  }
}
