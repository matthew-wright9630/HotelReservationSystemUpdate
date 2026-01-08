import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingNavbarComponent } from './booking-navbar-component';

describe('BookingNavbarComponent', () => {
  let component: BookingNavbarComponent;
  let fixture: ComponentFixture<BookingNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingNavbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
