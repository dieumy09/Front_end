import { PostService } from './../../../../services/post.service';
import { tap } from 'rxjs/operators';
import { Post } from 'src/app/models/post';
import { PagerService } from './../../../../services/pager.service';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';

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
    private searchService: SearchService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      keyword: [''],
    });
    this.searchService.listPost$
      .pipe(
        tap((posts) => {
          if (posts) {
            this.pager = this.pagerService.getPager(
              posts.totalElements,
              posts.number + 1,
              posts.size
            );
          }
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
      });
    this.jumpToPage(1);
  }

  handleSearchClick(): void {
    this.currentKeyword = this.searchForm.value.keyword;
    this.jumpToPage(1);
  }

  jumpToPage(page): void {
    this.searchService.searchApprovedPosts(
      { keyword: this.currentKeyword },
      page - 1
    );
  }

  handleBlock(id: number): void {
    this.postService.blockPost(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  handleUnblock(id: number): void {
    this.postService.unblockPost(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
