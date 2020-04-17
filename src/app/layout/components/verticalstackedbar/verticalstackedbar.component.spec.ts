import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalstackedbarComponent } from './verticalstackedbar.component';

describe('VerticalstackedbarComponent', () => {
  let component: VerticalstackedbarComponent;
  let fixture: ComponentFixture<VerticalstackedbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalstackedbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalstackedbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
