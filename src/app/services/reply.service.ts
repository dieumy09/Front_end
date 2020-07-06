import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reply} from '../models/reply';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {
  private readonly API = 'http://localhost:8080/api/v1/replies';

  constructor(private http: HttpClient) { }

  getReplies(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  createReply(reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(this.API, reply);
  }

  editReply(reply: Reply): Observable<Reply> {
    return this.http.patch<Reply>(`${this.API}/${reply.id}`, reply);
  }

  deleteReply(id: number): Observable<Reply> {
    return this.http.delete<Reply>(`${this.API}/${id}`);
  }
}
