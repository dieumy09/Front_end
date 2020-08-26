import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../../services/post.service';
import {Post} from '../../../../models/post';
import {Comment} from '../../../../models/comment';
import {CommentService} from '../../../../services/comment.service';
import {User} from '../../../../models/user';
import {UserService} from '../../../../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Reply} from '../../../../models/reply';
import {ReplyService} from '../../../../services/reply.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {ViewCountStatisticService} from '../../../../services/view-count-statistic.service';
import {ViewCountStatistic} from '../../../../models/view-count-statistic';
import {DatePipe} from '@angular/common';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  providers: [DatePipe],
})
export class PostDetailComponent implements OnInit {
  post: Post;
  user: User;
  userId: number;
  comment = this.formBuilder.group({
    content: ['', [Validators.required]],
    user: [],
    post: []
  });
  comments: Comment[];
  reply = this.formBuilder.group({
    content: ['', [Validators.required]],
    user: [],
    comment: []
  });
  indexComment: number;
  indexReply: number;
  isShowReply = false;
  isShowEditFormReply = false;
  isShowEditFormComment = false;
  edit: string;
  paginateComment: any;
  maxSize = 7;
  responsive = true;
  public  labels: any = {
    previousLabel: '',
    nextLabel: '',
  };
  viewCountStatistic: ViewCountStatistic;
  viewCountStatisticForm = this.formBuilder.group({
    dateStatistic: this.datePipe.transform(new Date().toLocaleDateString(), 'MM/dd/yyyy'),
    viewCount: [1]
  });

  constructor(
    private postService: PostService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private commentService: CommentService,
    private replyService: ReplyService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private viewCountStatisticService: ViewCountStatisticService,
    private modalService: NgbModal,
    private datePipe: DatePipe,
  ) {
    this.paginateComment = {
      itemsPerPage: 7,
      currentPage: 1,
    };
  }

  ngOnInit(): void {
    this.getUser();
    this.getPostById();
    this.getCommentsByPost();
    this.updateViewCountStatistic();
  }

  getUser() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.authService.getCurrentUser();
  }

  getPostById() {
    this.activatedRoute.params.subscribe(next => {
      this.postService.getPostById(next.id).subscribe(data => {
        this.post = data;
        this.post.viewCount += 1;
        this.postService.editPost(this.post, next.id).subscribe();
      });
    });
  }

  updateViewCountStatistic() {
    this.viewCountStatisticService.getLastViewCountStatistic().subscribe(data => {
      if (data === null) {
        this.viewCountStatisticService.createViewCountStatistic(this.viewCountStatisticForm.value).subscribe();
      } else {
        const lastDate = new Date(data.dateStatistic + ' 23:59:59');
        const currentDate = new Date();
        if (lastDate < currentDate) {
          this.viewCountStatisticService.createViewCountStatistic(this.viewCountStatisticForm.value).subscribe();
        } else {
          this.viewCountStatistic = data;
          this.viewCountStatistic.viewCount += 1;
          this.viewCountStatisticService.editViewCountStatistic(this.viewCountStatistic).subscribe();
        }
      }
    });
  }

  getCommentsByPost() {
    this.activatedRoute.params.subscribe(next => {
      this.commentService.getCommentsByPostId(next.id).subscribe(data => {
        // @ts-ignore
        this.comments = data.content;
        for (const comment of this.comments){
          comment.replies.sort((a, b)  =>  a.id - b.id);
        }
      });
    });
  }

  commentSubmit() {
    if (this.comment.valid) {
      this.comment.patchValue({
        user: this.user,
        post: this.post,
      });
      this.commentService.createComment(this.comment.value).subscribe(data => {
        this.getCommentsByPost();
      });
      this.comment.patchValue({
        content: ['']
      });
    }
    this.pageChanged(1);
  }

  replySubmit(comment: Comment) {
    if (this.reply.valid) {
      this.reply.patchValue({
        user: this.user,
        comment,
      });
      this.replyService.createReply(this.reply.value).subscribe(data => {
        this.getCommentsByPost();
      });
      this.reply.patchValue({
        content: ['']
      });
      this.isShowReply = false;
    }
  }

  showEditComment(indexComment: number, comment: Comment) {
    this.edit = comment.content;
    this.indexComment = indexComment;
    this.isShowEditFormComment = true;
    this.isShowEditFormReply = false;
    this.isShowReply = false;
  }

  editComment(comment: Comment) {
    this.comment.patchValue({
      content: this.edit,
      user: this.user,
      post: this.post,
    });
    if (this.comment.valid) {
      this.commentService.editComment(this.comment.value, comment.id).subscribe(next => {
        this.getCommentsByPost();
      });
      this.comment.patchValue({
        content: ['']
      });
      this.isShowEditFormComment = false;
    }
  }

  deleteComment(id) {
    this.commentService.deleteComment(id).subscribe(next => {
      this.getCommentsByPost();
    });
    this.modalService.dismissAll();
  }

  showEditReply(indexComment: number, indexReply: number, comment: Comment, reply: Reply) {
    this.edit = reply.content;
    this.indexComment = indexComment;
    this.indexReply = indexReply;
    this.isShowEditFormReply = true;
    this.isShowEditFormComment = false;
    this.isShowReply = false;
  }

  editReply(reply: Reply, comment: Comment) {
    this.reply.patchValue({
      content: this.edit,
      comment,
      user: this.user,
    });
    if (this.reply.valid) {
      this.replyService.editReply(this.reply.value, reply.id).subscribe(data => {
        this.getCommentsByPost();
      });
      this.reply.patchValue({
        content: ['']
      });
      this.isShowEditFormReply = false;
    }
  }

  deleteReply(id) {
    this.replyService.deleteReply(id).subscribe(next => {
      this.getCommentsByPost();
    });
    this.modalService.dismissAll();
  }

  checkLoginComment(content) {
    if (this.user === null) {
      this.modalService.open(content);
    }
  }

  checkLoginReply(content, indexComment) {
    if (this.user === null) {
      this.modalService.open(content);
    } else {
      this.isShowReply = true;
      this.isShowEditFormReply = false;
      this.isShowEditFormComment = false;
      this.indexComment = indexComment;
      this.reply.patchValue({
        content: ['']
      });
    }
  }

  openModalDelete(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  pageChanged(event){
    this.paginateComment.currentPage = event;
  }
}
