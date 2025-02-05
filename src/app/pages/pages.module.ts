import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { PagesRoutingModule } from './pages-routing.module';
import { TodosComponent } from './todos/todos.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [TodosComponent, CategoryComponent],
  imports: [CommonModule, PagesRoutingModule, MatTableModule],
})
export class PagesModule {}
