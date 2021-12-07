import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegistrationDiscountPageComponent } from './student-registration-discount-page.component';

describe('StudentRegistrationDiscountPageComponent', () => {
  let component: StudentRegistrationDiscountPageComponent;
  let fixture: ComponentFixture<StudentRegistrationDiscountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRegistrationDiscountPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegistrationDiscountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
