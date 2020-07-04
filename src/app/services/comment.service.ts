import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly API = 'http://localhost:8080/api/v1/comments';

  constructor(private http: HttpClient) {}

  getComments(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.API}/${id}`);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.API, comment);
  }

  editComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.API}/${comment.id}`, comment);
  }

  deleteComment(id: number): Observable<Comment> {
    return this.http.delete<Comment>(`${this.API}/${id}`);
  }
}
