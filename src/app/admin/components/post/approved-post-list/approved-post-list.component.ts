import { Post } from 'src/app/models/post';
import { PostService } from './../../../../services/post.service';
import { PagerService } from './../../../../services/pager.service';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-approved-post-list',
  templateUrl: './approved-post-list.component.html',
  styleUrls: ['./approved-post-list.component.scss'],
})
export class ApprovedPostListComponent implements OnInit {
  posts: List<Post>;
  searchForm: FormGroup;
  currentKeyword = '';
  pager: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private pagerService: PagerService,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  handleSearchClick() {}

  jumpToPage(page) {}
}
