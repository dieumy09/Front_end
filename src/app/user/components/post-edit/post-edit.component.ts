import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  postImage: FormGroup;
  postId: number;
  selectedDirection: Direction;
  fileToUpload: File = null;
  imageUrl = '';
  image: PostImage;
  category: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private categoryService: CategoryService,
    private regionService: RegionService,
    private postTypeService: PostTypeService,
    private directionService: DirectionService,
    private postImageService: PostImageService,
    private modalService: NgbModal
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
      category: this.formBuilder.group({
        id: [''],
        name: ['']
      }),
      postImages: [''],
      postType: this.formBuilder.group({
        id: [''],
        name: ['']
      }),
      direction: this.formBuilder.group({
        id: [''],
        name: ['']
      }),
      createdAt: [''],
      updatedAt: [''],
      region: this.formBuilder.group({
        id: [''],
        name: ['']
      }),
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

  // CALLED IN HTML FILE
// ***********************************************************************************

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
      // if (this.fileToUpload != null) {
      //   this.postImage = this.formBuilder.group({
      //     image: ['']
      //   });
      //   this.postImage.value.image = this.fileToUpload.name;
      //   this.postImageService.createPostImage(this.postImage.value).subscribe(() => {
      //
      //   });
      // }
      this.postService.editPost(this.editPostForm.value, this.postId).subscribe(data => {
        console.log('post: ' + data.region.name);
        this.router.navigateByUrl(`/user/${data.user.id}`);
      });
    }
  }

  deletePostImage(image: PostImage) {
    this.postImageService.getPostImageById(image.id).subscribe(data => {
      image = data;
    });
    image.status = false;
    this.postImageService.editPostImage(image).subscribe();
    this.modalService.dismissAll();
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);

    // Show image preview
    const reader = new FileReader();
    reader.onload = (data: any) => {
      this.imageUrl = data.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  openModal(targetModal, image) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.image = image;
  }
  changeCity(e) {
   this.category = e.target.value;
  }


// ***********************************************************************************


// ***********************************************************************************

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
