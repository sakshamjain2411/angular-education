import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympiadsPageComponent } from './olympiads-page.component';

describe('OlympiadsPageComponent', () => {
  let component: OlympiadsPageComponent;
  let fixture: ComponentFixture<OlympiadsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlympiadsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlympiadsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
