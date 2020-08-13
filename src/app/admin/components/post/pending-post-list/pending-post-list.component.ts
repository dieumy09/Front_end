import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { Post } from 'src/app/models/post';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PagerService } from 'src/app/services/pager.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-pending-post-list',
  templateUrl: './pending-post-list.component.html',
  styleUrls: ['./pending-post-list.component.scss'],
})
export class PendingPostListComponent implements OnInit {
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
