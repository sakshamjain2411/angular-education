import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegistrationPageComponent } from './student-registration-page.component';

describe('StudentRegistrationPageComponent', () => {
  let component: StudentRegistrationPageComponent;
  let fixture: ComponentFixture<StudentRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRegistrationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
