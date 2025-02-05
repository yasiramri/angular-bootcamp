import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'http://localhost:4912';

  constructor(private http: HttpClient) {}

  getCategory(): Observable<any> {
    return this.http.get(this.apiUrl + '/category');
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(this.apiUrl + '/category', category);
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put(this.apiUrl + '/category/' + id, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/category/' + id);
  }
}
