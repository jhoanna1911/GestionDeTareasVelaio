import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskComponent, TaskListComponent ],
      imports: [         BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.task = { id: 1, title: 'Test Task', completed: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task title', () => {
    const taskTitle = debugElement.query(By.css('span')).nativeElement;
    expect(taskTitle.textContent).toContain('Test Task');
  });

  it('should emit toggle event when checkbox is clicked', () => {
    spyOn(component.toggle, 'emit');
    const checkboxDebugElement = debugElement.query(By.css('mat-checkbox'));
    checkboxDebugElement.triggerEventHandler('change', { checked: true });
    expect(component.toggle.emit).toHaveBeenCalled();
  });

  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.delete, 'emit');
    const deleteButton = debugElement.query(By.css('button')).nativeElement;
    deleteButton.click();
    expect(component.delete.emit).toHaveBeenCalled();
  });
});
