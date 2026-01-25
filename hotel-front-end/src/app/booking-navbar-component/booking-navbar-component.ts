import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataPassService } from '../services/data-pass-service';

@Component({
  selector: 'app-booking-navbar-component',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
  ],
  templateUrl: './booking-navbar-component.html',
  styleUrl: './booking-navbar-component.css',
})
export class BookingNavbarComponent {
  private router = inject(Router);
  findRoomsForm: FormGroup;

  // specify earliest dates selectable for check-in and check-out
  datePipe = new DatePipe('en-US');
  tomorrow: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  todayString: String | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  tomorrowString: String | null = this.datePipe.transform(this.tomorrow, 'yyyy-MM-dd');

  constructor(
    private fb: FormBuilder,
    private dataPass: DataPassService,
  ) {
    this.findRoomsForm = this.fb.group({
      checkInDate: new FormControl(this.todayString, [Validators.required]),
      checkOutDate: new FormControl(this.tomorrowString, [Validators.required]),
      rooms: this.fb.array([new FormControl(1, [Validators.required])]),
      adaAccessible: new FormControl(false),
      nonSmoking: new FormControl(true),
    });
  }

  // Getter to easily access the FormArray in the template
  get rooms(): FormArray {
    return this.findRoomsForm.get('rooms') as FormArray;
  }

  // Method called when the "Add Room" button is clicked
  addRoom(): void {
    //only allow up to four rooms
    if (this.rooms.length < 4) {
      this.rooms.push(this.fb.control(1, Validators.required));
    }
  }

  // Method to remove a field at a specific index
  removeRoom(index: number): void {
    this.rooms.removeAt(index);
  }

  // to be connected with rooms component
  submitfindRoomsForm(): void {
    console.log(this.findRoomsForm.value);
    this.dataPass.bookingSearchSignal.set(this.findRoomsForm.value);
    this.router.navigate(['/search']);
  }
}
