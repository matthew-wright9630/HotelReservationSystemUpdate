import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-navbar-component',
  imports: [ReactiveFormsModule],
  templateUrl: './booking-navbar-component.html',
  styleUrl: './booking-navbar-component.css',
})
export class BookingNavbarComponent {
  findRoomsForm: FormGroup;

  // specify earliest dates selectable for check-in and check-out
  datePipe = new DatePipe('en-US');
  tomorrow: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  todayString: String | null = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  tomorrowString: String | null = this.datePipe.transform(this.tomorrow, 'yyyy-MM-dd');

  constructor(private fb: FormBuilder){
    this.findRoomsForm = this.fb.group({
      checkInDate: new FormControl(this.todayString, [Validators.required]),
      checkOutDate: new FormControl(this.tomorrowString, [Validators.required]),
      rooms: this.fb.array([new FormControl(1, [Validators.required])]),
      adaAccessible: new FormControl(false),
      nonSmoking: new FormControl(true)
    })
  }

  // Getter to easily access the FormArray in the template
  get rooms(): FormArray {
    return this.findRoomsForm.get('rooms') as FormArray;
  }

  // Method called when the "Add Room" button is clicked
  addRoom(): void {
    //only allow up to four rooms
    if(this.rooms.length<4){
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
  }
}
