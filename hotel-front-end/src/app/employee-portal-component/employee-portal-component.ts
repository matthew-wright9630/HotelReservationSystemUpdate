import { Component, signal } from '@angular/core';
import { EmployeeAvailableRoomsComponent } from '../employee-available-rooms-component/employee-available-rooms-component';
import { EmployeeEditRoomComponent } from '../employee-edit-room-component/employee-edit-room-component';
import { DataPassService } from '../services/data-pass-service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service';
import { ManageUsersComponent } from '../manage-users-component/manage-users-component';

@Component({
  selector: 'app-employee-portal-component',
  imports: [EmployeeAvailableRoomsComponent, EmployeeEditRoomComponent, ManageUsersComponent],
  templateUrl: './employee-portal-component.html',
  styleUrl: './employee-portal-component.css',
})
export class EmployeePortalComponent {
  // This element will determine what component is displayed in the employee-portal.
  // Defaults to available-rooms component.
  selectionElement: string = 'available-rooms';

  // userRole: string = '';
  userRole = signal<string>('');

  displayAvailableRoomsComponent(): void {
    this.selectionElement = 'available-rooms';
  }

  //This updates the selection element to display the edit-rooms component.
  displayEditRoomsComponent(): void {
    this.selectionElement = 'edit-rooms';
  }

  //This updates the selection element to display the manage-users component.
  displayManageUsersComponent(): void {
    this.selectionElement = 'manage-users';
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
      this.checkUserRole();
    });
  }

  checkUserRole(): void {
    const role = this.dataPass.loggedInUser()?.role ?? null;
    if (!role) {
      this.router.navigate(['/homepage']);
      return;
    }

    this.userRole.set(role);

    if (role !== 'manager' && role !== 'admin') {
      this.router.navigate(['/homepage']);
    }
  }
}
