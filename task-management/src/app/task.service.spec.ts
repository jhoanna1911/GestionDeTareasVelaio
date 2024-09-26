import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task', () => {
    service.addTask('Test Task');
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Test Task');
    });
  });

  it('should toggle task completion', () => {
    service.addTask('Test Task');
    service.toggleTaskCompletion(1);
    service.getTasks().subscribe(tasks => {
      expect(tasks[0].completed).toBeTrue();
    });
  });

  it('should delete a task', () => {
    service.addTask('Test Task');
    service.deleteTask(1);
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(0);
    });
  });
});
