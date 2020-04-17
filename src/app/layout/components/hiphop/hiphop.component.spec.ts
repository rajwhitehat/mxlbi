import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiphopComponent } from './hiphop.component';

describe('HiphopComponent', () => {
  let component: HiphopComponent;
  let fixture: ComponentFixture<HiphopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiphopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiphopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
