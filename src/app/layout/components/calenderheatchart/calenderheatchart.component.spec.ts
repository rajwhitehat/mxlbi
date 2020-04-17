import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderheatchartComponent } from './calenderheatchart.component';

describe('CalenderheatchartComponent', () => {
  let component: CalenderheatchartComponent;
  let fixture: ComponentFixture<CalenderheatchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderheatchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderheatchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
