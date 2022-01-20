import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingDataPageComponent } from './processing-data-page.component';

describe('ProcessingDataPageComponent', () => {
  let component: ProcessingDataPageComponent;
  let fixture: ComponentFixture<ProcessingDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingDataPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
