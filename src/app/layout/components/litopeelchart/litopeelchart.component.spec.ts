import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitopeelchartComponent } from './litopeelchart.component';

describe('LitopeelchartComponent', () => {
  let component: LitopeelchartComponent;
  let fixture: ComponentFixture<LitopeelchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitopeelchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitopeelchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
