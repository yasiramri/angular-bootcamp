import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl = 'http://localhost:4912';

  constructor(private http: HttpClient) {}

  // Get all todos
  getTodos(): Observable<any> {
    return this.http.get(this.apiUrl + '/todos');
  }

  // Add a new todo
  addTodo(todo: any): Observable<any> {
    return this.http.post(this.apiUrl + '/todos', todo);
  }

  // Update an existing todo
  updateTodo(id: number, todo: any): Observable<any> {
    return this.http.put(this.apiUrl + '/todos/' + id, todo);
  }

  // Delete a todo by ID
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todos/${id}`, httpOptions);
  }

  createData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/todos', data, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Berear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczODgwNzIxOSwiZXhwIjoxNzM4ODkzNjE5fQ.uJjhCuiPZJil_B4ts8BBG0TVCSBHNR_AvEw-doTYQZQ',
  }),
};
