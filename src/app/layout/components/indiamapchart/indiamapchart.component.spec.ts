import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiamapchartComponent } from './indiamapchart.component';

describe('IndiamapchartComponent', () => {
  let component: IndiamapchartComponent;
  let fixture: ComponentFixture<IndiamapchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiamapchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiamapchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
