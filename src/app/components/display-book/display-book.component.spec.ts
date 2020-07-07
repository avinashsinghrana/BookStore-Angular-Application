import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBooksComponent } from './display-book.component';

describe('DisplayBooksComponent', () => {
  let component: DisplayBooksComponent;
  let fixture: ComponentFixture<DisplayBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
