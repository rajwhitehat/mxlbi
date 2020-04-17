import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HirarchicalBarChartComponent } from './hirarchical-bar-chart.component';

describe('HirarchicalBarChartComponent', () => {
  let component: HirarchicalBarChartComponent;
  let fixture: ComponentFixture<HirarchicalBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirarchicalBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HirarchicalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
