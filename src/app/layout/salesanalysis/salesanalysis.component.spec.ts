import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmprofileComponent } from './smprofile.component';

describe('SmprofileComponent', () => {
  let component: SmprofileComponent;
  let fixture: ComponentFixture<SmprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
