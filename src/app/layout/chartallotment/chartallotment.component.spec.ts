import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartallotmentComponent } from './chartallotment.component';

describe('ChartallotmentComponent', () => {
  let component: ChartallotmentComponent;
  let fixture: ComponentFixture<ChartallotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartallotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartallotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
