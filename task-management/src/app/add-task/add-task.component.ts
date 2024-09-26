import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle);
      this.newTaskTitle = '';
    }
  }
}
