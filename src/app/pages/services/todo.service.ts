import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl = 'http://localhost:4912';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(this.apiUrl + '/todos');
  }
}
