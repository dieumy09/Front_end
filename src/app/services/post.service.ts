import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API = 'http://localhost:8080/api/v1/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  createPost(post: Post): Observable<any> {
    return this.http.post<any>(this.API, post);
  }

  editPost(post: Post, id: number): Observable<any> {
    return this.http.put(`${this.API}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }
}
