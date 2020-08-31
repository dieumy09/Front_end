import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private readonly API = 'http://localhost:8080/api/v1/regions';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  getRegionsPages(page: number): Observable<any> {
    return this.http.get<any>(`${this.API}/pages?page=${page}`);
  }

  getRegionById(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.API}/${id}`);
  }

  createRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.API, region);
  }

  editRegion(region: Region): Observable<Region> {
    return this.http.patch<Region>(`${this.API}/${region.id}`, region);
  }

  deleteRegion(id: number): Observable<Region> {
    return this.http.delete<Region>(`${this.API}/${id}`);
  }
}
