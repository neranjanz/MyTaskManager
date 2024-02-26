import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskItem } from './models/taskItem';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskDataServiceService {

  constructor(private router: Router) {}

  private taskDataSubject = new BehaviorSubject<TaskItem | null>(null);
  taskData$: Observable<TaskItem | null> = this.taskDataSubject.asObservable();

  private eventDataSubject = new BehaviorSubject<boolean>(false);
  isUpdated$ = this.eventDataSubject.asObservable();

  sendTaskData(taskData: TaskItem) {
    this.taskDataSubject.next(taskData);
  }

}
