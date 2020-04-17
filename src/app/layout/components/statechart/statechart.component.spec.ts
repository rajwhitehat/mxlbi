import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatechartComponent } from './statechart.component';

describe('StatechartComponent', () => {
  let component: StatechartComponent;
  let fixture: ComponentFixture<StatechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
