import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Litopil1chartComponent } from './litopil1chart.component';

describe('Litopil1chartComponent', () => {
  let component: Litopil1chartComponent;
  let fixture: ComponentFixture<Litopil1chartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Litopil1chartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Litopil1chartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
