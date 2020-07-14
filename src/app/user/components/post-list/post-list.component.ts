import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[];
  post: Post;
  page = 0;
  pages: number[];
  search = '';
  totalElements: number;
  pageSize: number;
  first: boolean;
  last: boolean;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getPostsByUser();
  }

  getPostsByUser() {
    this.activatedRoute.params.subscribe(next => {
      this.userService.getPostsByUserId(next.id, this.page, this.search).subscribe(data => {
        // @ts-ignore
        this.posts = data.content;
        // @ts-ignore
        this.totalElements = data.totalElements;
        // @ts-ignore
        this.pageSize = data.size;
        // @ts-ignore
        this.page = data.number;
        // @ts-ignore
        this.first = data.first;
        // @ts-ignore
        this.last = data.last;
        console.log('page:' + this.page);
        // @ts-ignore
        this.pages = new Array(data.totalPages);
        console.log('search is: ' + this.search);
      });
    });
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getPostsByUser();
  }

  deletePost(post: Post): void {
    this.postService.getPostById(post.id).subscribe(data => {
      post = data;
    });
    post.status = false;
    this.postService.editPost(post, post.id).subscribe(data => {
      console.log(data);
    });
    this.modalService.dismissAll();
  }

  openModal(targetModal, post) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.post = post;
  }
}
