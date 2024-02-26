import { Component, OnInit } from '@angular/core';
import { TaskItem } from '../shared/models/taskItem';
import { TaskService } from './task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [SharedModule, TaskListComponent, TaskDetailComponent, ToastrModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {

  appTitle = 'My-Task Manager';
  tasks: TaskItem[] = [];
  selectedTask!: TaskItem;
  defaultSort = 'idDesc';
  defaultFilter = 'all'
  sortOptions = [
    {name: 'Tasks by Newest to Oldest', value: 'idDesc'},
    {name: 'Tasks by Oldest to Newest', value: 'idAsc'},
    {name: 'Tasks by Title (A-Z)', value: 'titleAsc'},
    {name: 'Tasks by Title (Z-A)', value: 'titleDesc'}
  ];

  filterOptions = [
    { name: 'All Tasks', value: 'all' },
    { name: 'Pending Tasks', value: 'byPending' },
    { name: 'Completed Tasks', value: 'byCompleted' },
  ];

  newTaskForm = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  constructor(private taskService: TaskService, public accountService: AccountService, private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.loadTaskItems();
  }

  loadTaskItems() {
    this.taskService.getTaskItems(this.defaultSort, this.defaultFilter).subscribe({
      next: response => this.tasks = response,
      error: error => console.log(error)
    })
  }
  
  onAddTask() {
    let txtValue = this.newTaskForm.get('title')?.value ?? '';

    if (txtValue.trim().length == 0) {
      this.toastr.warning('Task title can not be empty!', 'MyTask');
      return;
    }
    let myNewTask: TaskItem = {id: 0, title: txtValue, isCompleted: false};

    this.taskService.createTask(myNewTask).subscribe({
      next: response => {
        this.toastr.success('New task added successfully!', 'MyTask');
        this.loadTaskItems();
        this.newTaskForm.reset();
      },
      error: err => {
        console.log(err);
        this.toastr.error('Failed to add new task!', 'MyTask')
      }
    });
  }

  onSortSelected(event: any) {
    this.defaultSort = event.target.value;
    this.loadTaskItems();
  }

  onFilterSelected(event: any) {
    this.defaultFilter = event.target.value;
    this.loadTaskItems();
  }

  getSelectedTask(taskItem: TaskItem) {
    this.selectedTask = taskItem;
  }

}
