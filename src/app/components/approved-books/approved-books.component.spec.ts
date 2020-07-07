import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedBooksComponent } from './approved-books.component';

describe('ApprovedBooksComponent', () => {
  let component: ApprovedBooksComponent;
  let fixture: ComponentFixture<ApprovedBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
