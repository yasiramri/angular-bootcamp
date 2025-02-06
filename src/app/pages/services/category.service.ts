import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/category', data, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Berear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczODgwNzIxOSwiZXhwIjoxNzM4ODkzNjE5fQ.uJjhCuiPZJil_B4ts8BBG0TVCSBHNR_AvEw-doTYQZQ',
  }),
};
