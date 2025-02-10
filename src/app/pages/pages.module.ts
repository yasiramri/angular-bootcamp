import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

import { PagesRoutingModule } from './pages-routing.module';
import { TodosComponent } from './todos/todos.component';
import { CategoryComponent } from './category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTodoComponent } from './todos/edit-todo/edit-todo.component';

@NgModule({
  declarations: [TodosComponent, CategoryComponent, EditTodoComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTableModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgApexchartsModule,
  ],
})
export class PagesModule {}
