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
  private readonly USER_API = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post> {
    return this.http.get<Post>(this.API);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.API, post);
  }

  editPost(post: Post, id: number): Observable<Post> {
    return this.http.put<Post>(`${this.API}/${id}`, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.API}/${id}`);
  }
}
