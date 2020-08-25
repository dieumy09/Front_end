import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../../../models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById() {
    this.activatedRoute.params.subscribe(next => {
      this.postService.getPostById(next.id).subscribe(data => {
        this.post = data;
      });
    });
  }

  removePost() {
    this.post.approved = false;
    this.postService.editPost(this.post, this.post.id).subscribe( () => {
    });
    this.router.navigateByUrl('/admin');
  }

  approvePost() {
    this.post.approved = true;
    this.postService.editPost(this.post, this.post.id).subscribe( () => {
    });
    this.router.navigateByUrl('/admin');
  }
}
