import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinechartasComponent } from './linechartas.component';

describe('LinechartasComponent', () => {
  let component: LinechartasComponent;
  let fixture: ComponentFixture<LinechartasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
