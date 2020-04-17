import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarreversechartComponent } from './barreversechart.component';

describe('BarreversechartComponent', () => {
  let component: BarreversechartComponent;
  let fixture: ComponentFixture<BarreversechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarreversechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarreversechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
