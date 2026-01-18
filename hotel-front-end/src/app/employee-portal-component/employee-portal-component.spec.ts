import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePortalComponent } from './employee-portal-component';

describe('EmployeePortalComponent', () => {
  let component: EmployeePortalComponent;
  let fixture: ComponentFixture<EmployeePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePortalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
