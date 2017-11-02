import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonImagesComponent } from './person-images.component';

describe('PersonImagesComponent', () => {
  let component: PersonImagesComponent;
  let fixture: ComponentFixture<PersonImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
