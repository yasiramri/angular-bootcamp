import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { CategoryService } from '../services/category.service';

export interface User {
  id: number;
  title: string;
  description: string;
  category_id: number;
  progress: number;
}

export interface Category {
  id: number;
  category: string;
}

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  editForm!: UntypedFormGroup;
  userId!: number;
  categoriesList: Category[] = []; // 🔥 List kategori untuk dropdown

  constructor(
    private route: ActivatedRoute,
    private apiService: TodoService,
    private categoryService: CategoryService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      category_id: [null, [Validators.required]],
      description: ['', [Validators.required]],
      progress: [null, [Validators.required]],
    });
    this.getUserById(this.userId);
    this.getCategory(); // 🔥 Ambil kategori untuk dropdown

    console.log('User ID:', this.userId);
  }

  private getUserById(id: number) {
    this.apiService.getTodoById(id).subscribe({
      next: (response) => {
        console.log('User Data Response:', response); // 🔥 Debugging
        if (response && response.data) {
          setTimeout(() => {
            // 🔥 Pastikan Angular mendeteksi perubahan
            this.editForm.patchValue(response.data);
            console.log('Form Updated with:', this.editForm.value);
          });
        } else {
          console.error('Invalid response format:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      },
    });
  }

  private getCategory() {
    this.categoryService.getCategory().subscribe({
      next: (data) => {
        this.categoriesList = data.data; // Simpan kategori ke array
        console.log('Categories:', this.categoriesList);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  onSubmitEdit() {
    this.editForm.markAllAsTouched();
    if (this.editForm.valid) {
      this.apiService.updateTodo(this.userId, this.editForm.value).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.router.navigate(['/pages/todos']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
        },
      });
    }
  }
}
