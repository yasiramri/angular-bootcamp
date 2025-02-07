import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../services/category.service';
import Swal from 'sweetalert2';

export interface Todos {
  id: number;
  title: string;
  description: string;
  category_id: number;
  created_by: string;
  progress: number;
}
export interface Category {
  id: number;
  category: string;
}
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  standalone: false,
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todoData: Todos[] = [];
  categoriesList: Category[] = [];
  combinedData = [...this.todoData, this.categoriesList];
  displayedColumns: string[] = [
    'title',
    'category_name',
    'description',
    'created_by',
    'progress',
    'actions',
  ];

  modalAdd: any;

  constructor(
    private todoService: TodoService,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.getTodos();
    this.getCategory();
    this.updateCombinedData();
    this.addForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      category_id: [null],
      description: [null],
      progress: [null],
    });
  }

  // Fetch the todos from the backend
  private getTodos() {
    this.todoService.getTodos().subscribe(
      (res) => {
        this.todoData = res.data;
        this.updateCombinedData();
        console.log(res);
      },
      (error) => {
        console.error('Error fetching todos', error);
      }
    );
  }

  private getCategory() {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categoriesList = data.data;
        this.updateCombinedData();
        console.log('Categories:', this.categoriesList);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  private updateCombinedData() {
    // Gabungkan todoData dengan kategori berdasarkan category_id
    this.combinedData = this.todoData.map((todo) => {
      // Mencari kategori berdasarkan category_id
      const category = this.categoriesList.find(
        (cat) => cat.id === todo.category_id
      );
      return {
        ...todo,
        category_name: category ? category.category : 'Unknown',
      }; // Menggunakan 'category_name' untuk nama kategori
    });
  }

  // Update a todo item
  onUpdate(todo: Todos) {
    const updatedTodo = {
      ...todo,
      title: 'Updated Title', // Example updated field
      description: 'Updated Description',
      progress: 100, // Example: marking as complete
    };

    this.todoService.updateTodo(todo.id, updatedTodo).subscribe(
      (updated) => {
        console.log('Updated Todo:', updated);
        this.getTodos(); // Reload the todos after update
      },
      (error) => {
        console.error('Error updating todo', error);
      }
    );
  }

  addButton(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  putButton(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  addForm!: UntypedFormGroup;
  get af() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.addForm.markAllAsTouched();

    if (this.addForm.valid) {
      const formData = this.addForm.value;
      formData.category_id = parseInt(formData.category_id, 10);
      formData.progress = parseInt(formData.progress, 10);
      console.log(formData);

      // Use TodoService's createData method to create a new todo
      this.todoService.createData(formData).subscribe({
        next: (data: any) => {
          console.log('Response from backend:', data);

          // Display SweetAlert for success
          Swal.fire({
            icon: 'success',
            title: 'Todo Created!',
            text: 'Your new todo has been successfully created.',
            showConfirmButton: false,
            timer: 1500, // Show for 1.5 seconds before auto-close
          });

          // Reset form and update UI after successful creation
          this.addForm.reset();
          this.modalService.dismissAll();
          this.getTodos(); // Update the list of todos
          this.ngOnInit(); // Re-initialize component
        },
        error: (error: any) => {
          console.error('Error occurred:', error);

          // Display SweetAlert for error
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'An error occurred while creating the todo.',
            showConfirmButton: true,
          });
        },
      });
    }
  }

  deleteTodo(todoId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this todo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(todoId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Your todo has been deleted.', 'success');
            this.getTodos(); // Refresh Data
          },
          error: (error) => {
            Swal.fire(
              'Error!',
              'There was an issue deleting your todo.',
              'error'
            );
            console.error('Error deleting todo:', error);
          },
        });
      }
    });
  }
}
