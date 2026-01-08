import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAvailableRoomsComponent } from './employee-available-rooms-component';

describe('EmployeeAvailableRoomsComponent', () => {
  let component: EmployeeAvailableRoomsComponent;
  let fixture: ComponentFixture<EmployeeAvailableRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAvailableRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAvailableRoomsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
