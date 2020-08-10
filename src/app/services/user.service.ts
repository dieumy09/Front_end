import { List } from './../models/list';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';
import {Password} from '../models/password';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<List<User>> {
    return this.http.get<List<User>>(this.API);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.API, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.API}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.API}/${id}`);
  }

  getPostsByUserId(
    id: number,
    page: number,
    search: string
  ): Observable<Iterable<Post>> {
    return this.http.get<Iterable<Post>>(
      `${this.API}/${id}/posts?search=${search}&page=${page}`
    );
  }

  blockUserById(id: number, reason: string): Observable<any> {
    return this.http.post<any>(`${this.API}/${id}/block`, { reason });
  }

  searchUsers(keyword: string, page = 0): Observable<List<User>> {
    return this.http.post<List<User>>(this.API + '/search?page=' + page, {
      keyword,
    });
  }

  changePassword(userId: number, password: Password): Observable<User> {
    return this.http.patch<User>(`${this.API}/${userId}/changePassword`, password);
  }
}
