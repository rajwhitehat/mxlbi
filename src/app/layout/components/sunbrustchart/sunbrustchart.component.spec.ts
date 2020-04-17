import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SunbrustchartComponent } from './sunbrustchart.component';

describe('SunbrustchartComponent', () => {
  let component: SunbrustchartComponent;
  let fixture: ComponentFixture<SunbrustchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SunbrustchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunbrustchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
