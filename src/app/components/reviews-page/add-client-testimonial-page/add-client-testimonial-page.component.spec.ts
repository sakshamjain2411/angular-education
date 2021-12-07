import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientTestimonialPageComponent } from './add-client-testimonial-page.component';

describe('AddClientTestimonialPageComponent', () => {
  let component: AddClientTestimonialPageComponent;
  let fixture: ComponentFixture<AddClientTestimonialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientTestimonialPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientTestimonialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
