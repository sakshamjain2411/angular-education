import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteDashboardPageComponent } from './institute-dashboard-page.component';

describe('InstituteDashboardPageComponent', () => {
  let component: InstituteDashboardPageComponent;
  let fixture: ComponentFixture<InstituteDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteDashboardPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
