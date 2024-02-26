import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TaskItem } from '../../shared/models/taskItem';
import { TaskDataServiceService } from '../../shared/task-data-service.service';
import { TaskService } from '../task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {

  @Output() isUpdatedList = new EventEmitter<boolean>();
  taskItem: TaskItem | null = null;

  taskDetail: FormGroup = new FormGroup({
    id: new FormControl(this.taskItem?.id),
    title: new FormControl(this.taskItem?.title, Validators.required),
    isCompleted: new FormControl(this.taskItem?.isCompleted)
  });

  constructor(private taskDataService: TaskDataServiceService, private taskService: TaskService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.taskDataService.taskData$.subscribe(task => {
      this.taskItem = task;
      this.populateTaskDetail(this.taskItem);
    })
  }

  populateTaskDetail(task: TaskItem | null) {
    if (task) {
      this.taskDetail.setValue({
        id: task?.id ?? 0,
        title: task?.title ?? '',
        isCompleted: task?.isCompleted ?? false
      });
    } else {
      this.resetTaskDetail();
    }
  }

  resetTaskDetail() {
    this.taskDetail.setValue({
      id: 0,
      title: '',
      isCompleted: false
    });  
  }

  onEditTask() {
    this.updateTaskItem();
    if (this.taskItem) {
      this.taskService.updateTask(this.taskItem.id, this.taskItem).subscribe({
          next: response => {
            this.toastr.success('Updated successfully!', 'MyTask');
            this.resetTaskDetail();
            this.isUpdatedList.emit();
          },
          error: err => {
            if (err.error.statusCode == '404') {
              this.toastr.error('Task item not found!','MyTask');
            }
          }
        })
      }
    
  }

  onDeleteTask() {
    this.updateTaskItem();
    if (this.taskItem) {
      this.taskService.deleteTask(this.taskItem.id).subscribe({
        next: response => {
          this.toastr.success('Deleted successfully!', 'MyTask');
          this.resetTaskDetail();
          this.isUpdatedList.emit();
        },
        error: (err) => {
          if (err.error.statusCode == '404') {
            this.toastr.error('Task item not found!','MyTask');
          }
        }
      })
    }
  }

  updateTaskItem() {
    this.taskItem = {
      id: this.taskDetail.get('id')?.value,
      title: this.taskDetail.get('title')?.value,
      isCompleted: this.taskDetail.get('isCompleted')?.value
    }
  }

  onResetTask() {
    this.resetTaskDetail();
  }

}
