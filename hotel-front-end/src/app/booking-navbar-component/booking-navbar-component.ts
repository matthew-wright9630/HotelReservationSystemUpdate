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
      checkInDate: new FormControl(new Date(), [Validators.required]),
      checkOutDate: new FormControl(this.tomorrow, [Validators.required]),
      rooms: this.fb.array([new FormControl(1, [Validators.required])]),
      adaAccessible: new FormControl(false),
      nonSmoking: new FormControl(true)
    })
  }

  // Getter to easily access the FormArray in the template
  get rooms(): FormArray {
    return this.findRoomsForm.get('rooms') as FormArray;
  }

  // Method to create a new form field group (e.g., label/value pair)
  private createRoomGroup(): FormGroup {
    return this.fb.group({
      label: ['Room '+ this.rooms.length, Validators.required],
      value: ['', Validators.required]
    });
  }

  // Method called when the "Add Room" button is clicked
  addRoom(): void {
    if(this.rooms.length<4){
      this.rooms.push(this.createRoomGroup());
    }
  }

  // Method to remove a field at a specific index
  removeRoom(index: number): void {
    this.rooms.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.findRoomsForm.value);
  }
}
