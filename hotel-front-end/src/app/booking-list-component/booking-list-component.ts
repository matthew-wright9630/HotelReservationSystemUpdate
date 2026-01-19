import { Component, signal } from '@angular/core';
import { Booking } from '../models/booking/booking';
import { HttpService } from '../services/http-service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from '../models/user/user';
import { Room } from '../models/room/room';
import { RoomDescription } from '../models/room-description/room-description';

@Component({
  selector: 'app-booking-list-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './booking-list-component.html',
  styleUrl: './booking-list-component.css',
})
export class BookingListComponent {
  editBookingForm: FormGroup;
  foundBookings = signal<Booking[]>([]);

  filteredBookings = signal<Booking[]>([]);

  selectedBooking = signal<Booking | null>(null);

  searchControl = new FormControl('');

  newRoomDescription: RoomDescription = new RoomDescription(
    0,
    '',
    false,
    false,
    '',
    0,
    0,
    false,
    '',
    false,
  );

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
  ) {
    this.findAllBookings();
    this.editBookingForm = this.fb.group({
      nameControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      phoneNumberControl: new FormControl(0, [
        Validators.required,
        // Enforces that it must be a 10 digit number.
        Validators.pattern('^[0-9]{10}$'),
      ]),
      emailControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      createdAt: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      checkInDate: new FormControl('', [Validators.required]),
      checkOutDate: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      numberOfGuests: new FormControl('', [Validators.required]),
      guest: new FormControl(new User(0, '', '', '', '', '', '', 0, false, false), [
        Validators.required,
      ]),
      employee: new FormControl(new User(0, '', '', '', '', '', '', 0, false, false), [
        Validators.required,
      ]),
      room: new FormControl(new Room(0, this.newRoomDescription, false), [Validators.required]),
      checkIn: new FormControl(false),
    });
  }

  findAllBookings(): void {
    this.httpService.getAllBookings().subscribe({
      next: (data) => {
        console.log(data);
        if (data) this.foundBookings.set(data);
      },
      error: (err) => console.error(err),
    });
  }

  ngOnInit() {
    // On init, subscribes to the change of searchControl and applies a filter based on its value.
    this.searchControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value) => this.applyFilter(value ?? ''));
  }

  // Applys filtering to the booking table.
  applyFilter(query: string) {
    // If the query is null, removes the filter and applys the full booking list.
    if (query === null) {
      this.filteredBookings.set(this.foundBookings());
    }
    const queryString = query.toLowerCase();

    const bookingList = this.foundBookings();

    const results = bookingList.filter((booking) => {
      // Checks the search against each of the fields and returns any rows that match the provided query.
      return (
        booking.name.toLowerCase().includes(queryString) ||
        booking.email.toLowerCase().includes(queryString)
        // booking.checkInDate.toLowerCase().includes(queryString) ||
        // booking.checkOutDate.includes(queryString) ||
      );
    });
    this.filteredBookings.set(results);
  }
}
