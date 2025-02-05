import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { PagesRoutingModule } from './pages-routing.module';
import { MasterUserComponent } from './master-user/master-user.component';
import { TodosComponent } from './todos/todos.component';

@NgModule({
  declarations: [MasterUserComponent, TodosComponent],
  imports: [CommonModule, PagesRoutingModule, MatTableModule],
})
export class PagesModule {}
