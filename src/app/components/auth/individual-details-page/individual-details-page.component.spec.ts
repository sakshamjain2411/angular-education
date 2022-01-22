import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualDetailsPageComponent } from './individual-details-page.component';

describe('IndividualDetailsPageComponent', () => {
  let component: IndividualDetailsPageComponent;
  let fixture: ComponentFixture<IndividualDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
