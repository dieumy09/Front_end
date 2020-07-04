import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly API = 'http://localhost:8080/api/v1/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.API, category);
  }

  editCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.API}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.API}/${id}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API}/${id}`);
  }
}
