import { List } from '../models/list';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API = 'http://localhost:8080/api/v1/posts';

  constructor(private http: HttpClient) {}

  getPosts(page = 0): Observable<List<Post>> {
    return this.http.get<List<Post>>(this.API + '?page=' + page);
  }

  getPostsByUserId(page = 0, userId: number): Observable<List<Post>> {
    return this.http.get<List<Post>>(
      this.API + '/user/' + userId + '?page=' + page
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API}/${id}`);
  }

  getPostsByViewCount(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API + '/mostViewCount');
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.API, post);
  }

  editPost(post: Post, postId: number): Observable<Post> {
    return this.http.patch<Post>(`${this.API}/${postId}`, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.API}/${id}`);
  }
}
