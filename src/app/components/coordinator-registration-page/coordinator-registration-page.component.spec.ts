import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorRegistrationPageComponent } from './coordinator-registration-page.component';

describe('CoordinatorRegistrationPageComponent', () => {
  let component: CoordinatorRegistrationPageComponent;
  let fixture: ComponentFixture<CoordinatorRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorRegistrationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
