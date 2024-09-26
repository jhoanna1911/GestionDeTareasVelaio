import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private tasks: Task[] = [];
  private nextId: number = 1;

  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(title: string): void {
    const newTask: Task = { id: this.nextId++, title, completed: false };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }

  toggleTaskCompletion(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next(this.tasks);
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next(this.tasks);
  }
}
