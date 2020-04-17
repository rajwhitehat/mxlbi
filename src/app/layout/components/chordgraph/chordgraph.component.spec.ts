import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordgraphComponent } from './chordgraph.component';

describe('ChordgraphComponent', () => {
  let component: ChordgraphComponent;
  let fixture: ComponentFixture<ChordgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
