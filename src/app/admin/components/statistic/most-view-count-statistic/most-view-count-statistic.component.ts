import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../../../models/post';

@Component({
  selector: 'app-most-view-count-statistic',
  templateUrl: './most-view-count-statistic.component.html',
  styleUrls: ['./most-view-count-statistic.component.scss']
})
export class MostViewCountStatisticComponent implements OnInit {
  posts: Post[];

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPostsByViewCount().subscribe( data => {
      this.posts = data;
    });
  }
}
