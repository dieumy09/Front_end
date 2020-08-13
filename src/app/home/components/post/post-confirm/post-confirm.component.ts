import { Component, OnInit } from '@angular/core';
import {PostDataService} from '../post-data.service';
import {Post} from '../../../../models/post';
import {PostService} from '../../../../services/post.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PostImageService} from '../../../../services/post-image.service';

@Component({
  selector: 'app-post-confirm',
  templateUrl: './post-confirm.component.html',
  styleUrls: ['./post-confirm.component.scss']
})
export class PostConfirmComponent implements OnInit {
  post: Post;
  listImages = [];
  fileImages = [];
  postImage: FormGroup;

  constructor(
    private postDataService: PostDataService,
    private postService: PostService,
    private postImageService: PostImageService,
    private formBuilder: FormBuilder,
    private router: Router,

  ) { }

  ngOnInit(): void {
   this.getPostData();
  }

  getPostData() {
    this.post = this.postDataService.postData;
    this.listImages = this.postDataService.listImages;
    this.fileImages = this.postDataService.fileImages;
    console.log(this.post);
  }

  submit() {
    this.postService.createPost(this.post).subscribe(data => {
      if (this.fileImages != null) {
        for (const fileImage of this.fileImages) {
          this.postImage = this.formBuilder.group({
            post: data,
            image: ['']
          });
          this.postImage.value.image = fileImage.name;
          this.postImageService.createPostImage(this.postImage.value).subscribe(() => {
          });
        }
      }
    });
  }

  backToPostForm() {
    this.router.navigateByUrl('/post-form');
  }


  backToHome() {
    this.postDataService.postData = undefined;
    this.router.navigateByUrl('/');
  }
}
