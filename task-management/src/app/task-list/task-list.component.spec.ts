import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule, By } from '@angular/platform-browser';
import { TaskComponent } from '../task/task.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    const taskServiceMock = {
      getTasks: () => of([{ id: 1, title: 'Test Task', completed: false }]),
      toggleTaskCompletion: jasmine.createSpy('toggleTaskCompletion'),
      deleteTask: jasmine.createSpy('deleteTask')
    };

    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent,  TaskComponent],
      imports: [BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule ],
      providers: [
        { provide: TaskService, useValue: taskServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tasks', () => {
    const taskElements = fixture.debugElement.queryAll(By.css('app-task'));
    expect(taskElements.length).toBe(1);
  });

  it('should call toggleTaskCompletion when toggle event is emitted', () => {
    component.toggleTaskCompletion(1);
    expect(taskService.toggleTaskCompletion).toHaveBeenCalledWith(1);
  });

  it('should call deleteTask when delete event is emitted', () => {
    component.deleteTask(1);
    expect(taskService.deleteTask).toHaveBeenCalledWith(1);
  });
});
