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

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  user: User;
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
  collectionSize: number;
  pageSize = 10;
  page = 1;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private replyService: ReplyService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getUser();
    this.getPostById();
    this.getCommentsByPost();
  }

  getUser() {
    this.userService.getUserById(3).subscribe(data => {
      this.user = data;
    });
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

  getCommentsByPost() {
    this.activatedRoute.params.subscribe(next => {
      this.commentService.getCommentsByPostId(next.id).subscribe(data => {
        // @ts-ignore
        this.comments = data.content;
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
  }

  showEditReply(indexComment: number, indexReply: number, comment: Comment, reply: Reply) {
    this.edit = reply.content;
    this.indexComment = indexComment;
    this.indexReply = indexReply;
    this.isShowEditFormReply = true;
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
  }

  changePage() {

  }
}
