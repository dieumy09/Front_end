import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Post} from '../../../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  // postData = new Subject<Post>();
  // currentPost = this.postData.asObservable();

  postData: Post;
  listImages = [];
  fileImages = [];

  constructor() { }

  addPostData(post: Post, listImages, fileImages) {
    this.postData = post;
    this.listImages = listImages;
    this.fileImages = fileImages;
  }
}
