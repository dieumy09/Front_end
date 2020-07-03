import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API = 'http://localhost:8080/api/v1/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.API, post);
  }

  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.API}/${post.id}`, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.API}/${id}`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API}/${id}`);
  }
}
