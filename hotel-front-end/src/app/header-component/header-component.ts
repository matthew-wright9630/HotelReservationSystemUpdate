import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../services/http-service';
import { DataPassService } from '../services/data-pass-service';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  constructor(private httpService: HttpService, private dataPassService: DataPassService) {
    this.getLoginDetails();
  }

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  getLoginDetails() {
    this.httpService.getCredentials().subscribe((data) => {
      console.log(data);
      this.dataPassService.loggedInEmployee.set(data);
    });
  }

  getLoggedInEmployee() {
    // console.log(this.dataPassService.loggedInEmployee(), 'I am in the homepage');
    return this.dataPassService?.loggedInEmployee();
  }

  logout() {
    this.httpService.logout();
    this.dataPassService.loggedInEmployee.set(null);
  }
}
