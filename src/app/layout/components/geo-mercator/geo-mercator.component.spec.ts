import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoMercatorComponent } from './geo-mercator.component';

describe('GeoMercatorComponent', () => {
  let component: GeoMercatorComponent;
  let fixture: ComponentFixture<GeoMercatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoMercatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoMercatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
