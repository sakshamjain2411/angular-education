import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteRegistrationPageComponent } from './institute-registration-page.component';

describe('InstituteRegistrationPageComponent', () => {
  let component: InstituteRegistrationPageComponent;
  let fixture: ComponentFixture<InstituteRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteRegistrationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
