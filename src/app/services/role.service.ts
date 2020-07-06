import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly API = 'http://localhost:8080/api/v1/roles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.API, role);
  }

  editRole(role: Role): Observable<Role> {
    return this.http.patch<Role>(`${this.API}/${role.id}`, role);
  }

  deleteRole(id: number): Observable<Role> {
    return this.http.delete<Role>(`${this.API}/${id}`);
  }
}
