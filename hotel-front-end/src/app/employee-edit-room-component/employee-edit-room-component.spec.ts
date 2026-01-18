import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditRoomComponent } from './employee-edit-room-component';

describe('EmployeeEditRoomComponent', () => {
  let component: EmployeeEditRoomComponent;
  let fixture: ComponentFixture<EmployeeEditRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeEditRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeEditRoomComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
