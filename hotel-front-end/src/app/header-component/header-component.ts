import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../services/http-service';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  constructor(private httpService: HttpService) {
    this.checkLogin();
  }

  login() {
    window.location.href = 'http://localhost:8080/login/oauth2/code/google';
  }

  checkLogin() {
    this.httpService.getEmployee('matthew.wright.ttb@google.com').subscribe((data) => {
      console.log(data);
    });
  }
}
