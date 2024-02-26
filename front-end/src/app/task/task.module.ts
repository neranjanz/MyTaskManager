import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    TaskComponent,
    ReactiveFormsModule,
  ],
  providers:[],
})
export class TaskModule { }
