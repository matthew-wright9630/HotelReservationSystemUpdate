import { Component } from '@angular/core';
import { PaymentComponent } from '../payment-component/payment-component';
import { GuestInformationComponent } from '../guest-information-component/guest-information-component';

@Component({
  selector: 'app-booking-component',
  imports: [GuestInformationComponent, PaymentComponent],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.css',
})
export class BookingComponent {

}
