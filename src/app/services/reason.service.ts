import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from '../models/list';
import {Reason} from '../models/reason';
import {Support} from '../models/support';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {
  private readonly API = 'http://localhost:8080/api/v1/reasons';

  constructor(private http: HttpClient) { }

  getReasons(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  getReasonById(id: number): Observable<Reason> {
    return this.http.get<Reason>(`${this.API}/${id}`);
  }

  createReason(reason: Reason): Observable<Reason> {
    return this.http.post<Reason>(this.API, reason);
  }

  updateReason(reason: Reason): Observable<Reason> {
    return this.http.patch<Reason>(`${this.API}/${reason.id}`, reason);
  }

  deleteReason(id: number): Observable<Reason> {
    return this.http.delete<Reason>(`${this.API}/${id}`);
  }
}
