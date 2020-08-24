import { PostService } from './../../../../services/post.service';
import { SearchService } from './../../../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';
import { Post } from 'src/app/models/post';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PagerService } from 'src/app/services/pager.service';
import { tap } from 'rxjs/operators';

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

  handleSearchClick() {
    this.currentKeyword = this.searchForm.value.keyword;
    this.jumpToPage(1);
  }

  jumpToPage(page) {
    this.searchService.searchPendingPosts(
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
