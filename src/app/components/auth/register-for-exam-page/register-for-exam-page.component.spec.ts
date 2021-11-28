import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForExamPageComponent } from './register-for-exam-page.component';

describe('RegisterForExamPageComponent', () => {
  let component: RegisterForExamPageComponent;
  let fixture: ComponentFixture<RegisterForExamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterForExamPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterForExamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
