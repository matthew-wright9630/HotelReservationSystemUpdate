import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../services/http-service';
import { DataPassService } from '../services/data-pass-service';

@Component({
  selector: 'app-checkin-guests-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkin-guests-component.html',
  styleUrl: './checkin-guests-component.css',
})
export class CheckinGuestsComponent {
  checkinForm: FormGroup;

  foundBookings = signal<[]>([]);

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dataPass: DataPassService
  ) {
    this.checkinForm = this.fb.group({
      firstNameControl: new FormControl(''),
      lastNameControl: new FormControl(''),
      emailControl: new FormControl(''),
      confirmationNumberControl: new FormControl(''),
    });
  }

  get firstNameControl() {
    return this.checkinForm.get('firstNameControl');
  }

  get lastNameControl() {
    return this.checkinForm.get('lastNameControl');
  }

  get emailControl() {
    return this.checkinForm.get('emailControl');
  }

  get confirmationNumberControl() {
    return this.checkinForm.get('confirmationNumberControl');
  }

  lookupReservation() {
    if (this.emailControl?.value) {
      console.log('Email: ', this.emailControl.value);
    }
    console.log(this.firstNameControl?.value, this.lastNameControl?.value);
  }
}
