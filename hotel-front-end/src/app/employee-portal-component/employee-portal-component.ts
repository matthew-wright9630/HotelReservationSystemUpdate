import { Component } from '@angular/core';
import { EmployeeAvailableRoomsComponent } from '../employee-available-rooms-component/employee-available-rooms-component';

@Component({
  selector: 'app-employee-portal-component',
  imports: [EmployeeAvailableRoomsComponent],
  templateUrl: './employee-portal-component.html',
  styleUrl: './employee-portal-component.css',
})
export class EmployeePortalComponent {}
