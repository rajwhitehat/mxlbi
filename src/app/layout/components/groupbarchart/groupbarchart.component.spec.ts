import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupbarchartComponent } from './groupbarchart.component';

describe('GroupbarchartComponent', () => {
  let component: GroupbarchartComponent;
  let fixture: ComponentFixture<GroupbarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupbarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
