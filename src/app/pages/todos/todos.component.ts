import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

export interface todos {
  title: string;
  description: string;
  created_by: String;
  progress: number;
}

@Component({
  selector: 'app-todos',
  standalone: false,

  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  userData: todos[] = [];
  displayedColumns: string[] = [
    'title',
    'description',
    'created_by',
    'progress',
  ];

  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.getTodos();
  }
  private getTodos() {
    this.todoService.getTodos().subscribe(
      (res) => {
        this.userData = res.data;
        console.log(res);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
