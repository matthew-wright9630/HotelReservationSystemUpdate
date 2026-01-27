import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinGuestsComponent } from './checkin-guests-component';

describe('CheckinGuestsComponent', () => {
  let component: CheckinGuestsComponent;
  let fixture: ComponentFixture<CheckinGuestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckinGuestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckinGuestsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
