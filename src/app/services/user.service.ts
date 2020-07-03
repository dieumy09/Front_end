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

  getUsers(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(this.API, user);
  }

  editUser(user: User, id: number): Observable<any> {
    return this.http.put(`${this.API}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`);
  }
}
