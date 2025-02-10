import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  // Get Category
  getCategory(): Observable<any> {
    return this.http.get(this.apiUrl + '/category');
  }

  // Get Todo by Id
  getTodoById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/todos/' + id);
  }

  // Update an existing todo
  updateTodo(id: number, todo: any): Observable<any> {
    return this.http.put(this.apiUrl + '/todos/' + id, todo, httpOptions);
  }

  // Delete a todo by ID
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/todos/' + id, httpOptions);
  }

  // Create a new todo
  createData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/todos', data, httpOptions);
  }

  // Search todos
  searchTodos(query: string): Observable<any> {
    const params = new HttpParams().set('query', query);
    return this.http.get(this.apiUrl + '/todos/search', { params });
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczOTE1ODkwMiwiZXhwIjoxNzM5MjQ1MzAyfQ.Vc7ZjlJxhwo1dG6PKM4lC5IIc3OZR6urHNxPgHob96A',
  }),
};
