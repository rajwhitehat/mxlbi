import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomablecirclepackingComponent } from './zoomablecirclepacking.component';

describe('ZoomablecirclepackingComponent', () => {
  let component: ZoomablecirclepackingComponent;
  let fixture: ComponentFixture<ZoomablecirclepackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomablecirclepackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomablecirclepackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
