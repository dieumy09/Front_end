import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from './../../../../services/post.service';
import { User } from './../../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user: User;
  posts: List<Post>;
  blockUserForm: FormGroup;
  constructor(
    private userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let id: string;
    this.route.paramMap.subscribe((params) => {
      id = params.get('id');
    });
    this.userService.getUserById(parseInt(id, 10)).subscribe((user) => {
      this.user = user;
    });
    this.postService
      .getPostsByUserId(0, parseInt(id, 10))
      .subscribe((posts) => {
        this.posts = posts;
      });
    this.blockUserForm = this.formBuilder.group({
      reason: ['', [Validators.required]],
    });
  }

  handleSubmitBlock() {
    this.userService
      .blockUserById(this.user.id, this.blockUserForm.value.reason)
      .subscribe((res) => {
        this.ngOnInit();
      });
  }

  handleClickNext() {
    this.postService
      .getPostsByUserId(this.posts.number + 1, this.user.id)
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  handleClickPrevious() {
    this.postService
      .getPostsByUserId(this.posts.number - 1, this.user.id)
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  jumpToPage(page) {
    console.log(page);
    this.postService.getPostsByUserId(page, this.user.id).subscribe((posts) => {
      this.posts = posts;
    });
  }
}
