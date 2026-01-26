import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../services/http-service';
import { DataPassService } from '../services/data-pass-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink, MatToolbarModule, MatButtonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  constructor(
    private httpService: HttpService,
    private dataPassService: DataPassService,
  ) {
    this.getLoginDetails();
  }

  login() {
    window.location.href = '/oauth2/authorization/google';
    // If deploying, use the backend's public URL, e.g.:
    // window.location.href = 'https://your-backend-domain/oauth2/authorization/google';
  }

  getLoginDetails() {
    this.httpService.getUserInfo().subscribe((data) => {
      this.dataPassService.loggedInUser.set(data);
      this.checkRoleType();
    });
  }

  getLoggedInUser() {
    return this.dataPassService?.loggedInUser();
  }

  logout() {
    this.httpService.logout();
    this.dataPassService.loggedInUser.set(null);
  }

  // Check if the user is an employee or a guest.
  employeeUser = signal(false);

  checkRoleType() {
    if (
      this.dataPassService.loggedInUser()?.role === 'manager' ||
      this.dataPassService.loggedInUser()?.role === 'admin'
    ) {
      this.employeeUser.set(true);
    } else {
      this.employeeUser.set(false);
    }
  }
}
