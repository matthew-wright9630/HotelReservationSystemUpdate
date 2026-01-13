import { Component } from '@angular/core';
import { EmployeeAvailableRoomsComponent } from '../employee-available-rooms-component/employee-available-rooms-component';
import { EmployeeEditRoomComponent } from '../employee-edit-room-component/employee-edit-room-component';
import { DataPassService } from '../services/data-pass-service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service';

@Component({
  selector: 'app-employee-portal-component',
  imports: [EmployeeAvailableRoomsComponent, EmployeeEditRoomComponent],
  templateUrl: './employee-portal-component.html',
  styleUrl: './employee-portal-component.css',
})
export class EmployeePortalComponent {
  // This element will determine what component is displayed in the employee-portal.
  // Defaults to available-rooms component.
  selectionElement: string = 'available-rooms';

  displayAvailableRoomsComponent(): void {
    this.selectionElement = 'available-rooms';
  }

  displayEditRoomsComponent(): void {
    //This updates the selection element to display the edit-rooms component.
    this.selectionElement = 'edit-rooms';
  }

  constructor(
    private router: Router,
    private httpService: HttpService,
    private dataPass: DataPassService
  ) {
    this.getLoginDetails();
  }

  getLoginDetails() {
    this.httpService.getUserInfo().subscribe((data) => {
      this.dataPass.loggedInUser.set(data);
      this.checkUserRole(data.role);
    });
  }

  checkUserRole(role: string): void {
    console.log(this.dataPass.loggedInUser());
    if (
      this.dataPass.loggedInUser()?.role !== 'manager' &&
      this.dataPass.loggedInUser()?.role !== 'admin'
    ) {
      this.router.navigate(['/homepage']);
    }
  }
}
