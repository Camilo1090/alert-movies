import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesCastComponent } from './series-cast.component';

describe('SeriesCastComponent', () => {
  let component: SeriesCastComponent;
  let fixture: ComponentFixture<SeriesCastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesCastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
