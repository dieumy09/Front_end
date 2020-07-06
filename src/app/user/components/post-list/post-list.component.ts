import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPostsByUser();
  }

  getPostsByUser() {
    this.activatedRoute.params.subscribe(next => {
      this.userService.getPostsByUserId(next.id).subscribe(data => {
        console.log('posts:' + data);
        // @ts-ignore
        this.posts = data.content;
        // console.log(this.posts);
      });
    });
  }
}
