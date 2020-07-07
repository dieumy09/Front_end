import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.API);
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

  getPostsByUserId(id: number, page: number, search: string): Observable<Iterable<Post>> {
    return this.http.get<Iterable<Post>>(`${this.API}/${id}/posts?search=${search}&page=${page}`);
  }
}
