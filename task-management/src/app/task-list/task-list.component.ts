import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks().pipe(
      map(tasks => this.applyFilter(tasks))
    );
  }

  ngOnInit(): void {}

  toggleTaskCompletion(id: number): void {
    this.taskService.toggleTaskCompletion(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.filter = filter;
    this.tasks$ = this.taskService.getTasks().pipe(
      map(tasks => this.applyFilter(tasks))
    );
  }

  private applyFilter(tasks: Task[]): Task[] {
    if (this.filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  }
}
