import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItem } from '../../shared/models/taskItem';
import { SharedModule } from '../../shared/shared.module';
import { TaskDataServiceService } from '../../shared/task-data-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})


export class TaskListComponent {
  @Input() taskList: TaskItem[] = [];
  @Output() selectedTask = new EventEmitter<TaskItem>()

  constructor(private taskDataService: TaskDataServiceService, private router: Router) {}

  onItemClick(taskItem: TaskItem) {
    this.router.navigateByUrl('/account/task');
    this.taskDataService.sendTaskData(taskItem);
  }
}




