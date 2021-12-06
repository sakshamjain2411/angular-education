import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSchoolStudentComponent } from './type-school-student.component';

describe('TypeSchoolStudentComponent', () => {
  let component: TypeSchoolStudentComponent;
  let fixture: ComponentFixture<TypeSchoolStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeSchoolStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeSchoolStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
