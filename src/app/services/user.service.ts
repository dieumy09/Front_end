import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.API);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.API, user);
  }

  editUser(user: User, id: number): Observable<User> {
    return this.http.put<User>(`${this.API}/${id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.API}/${id}`);
  }
}
