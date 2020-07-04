import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
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
      this.userService.getUserById(next.id).subscribe(data => {
        this.posts = data.posts;
      });
    });
  }
}
