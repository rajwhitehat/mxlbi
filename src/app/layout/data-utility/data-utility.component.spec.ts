import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUtilityComponent } from './data-utility.component';

describe('DataUtilityComponent', () => {
  let component: DataUtilityComponent;
  let fixture: ComponentFixture<DataUtilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataUtilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
