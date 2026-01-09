import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer-component/footer-component';
import { HeaderComponent } from './header-component/header-component';
import { BookingNavbarComponent } from './booking-navbar-component/booking-navbar-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BookingNavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('hotel-front-end');
}
