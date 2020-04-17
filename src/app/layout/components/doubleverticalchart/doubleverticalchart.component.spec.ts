import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleverticalchartComponent } from './doubleverticalchart.component';

describe('DoubleverticalchartComponent', () => {
  let component: DoubleverticalchartComponent;
  let fixture: ComponentFixture<DoubleverticalchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleverticalchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleverticalchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
