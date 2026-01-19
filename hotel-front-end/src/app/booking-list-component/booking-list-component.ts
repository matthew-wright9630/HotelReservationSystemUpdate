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
import { RoomDescriptionComponent } from '../room-description-component/room-description-component';
import { DataPassService } from '../services/data-pass-service';

@Component({
  selector: 'app-booking-list-component',
  imports: [ReactiveFormsModule, CommonModule, RoomDescriptionComponent],
  templateUrl: './booking-list-component.html',
  styleUrl: './booking-list-component.css',
})
export class BookingListComponent {
  editBookingForm: FormGroup;
  viewBookingForm: FormGroup;
  foundBookings = signal<Booking[]>([]);

  filteredBookings = signal<Booking[]>([]);

  selectedBooking = signal<Booking | null>(null);
  selectedRoomDescription = signal<RoomDescription>(
    new RoomDescription(0, '', false, false, '', 0, 0, false, '', false),
  );

  // Signal for determing what type of submission the editBookingForm should do.
  editType = signal<string>('edit');

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
    private dataPass: DataPassService,
  ) {
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
      createdAtControl: new FormControl(''),
      checkInDateControl: new FormControl<Date>(new Date(), [Validators.required]),
      checkOutDateControl: new FormControl<Date>(new Date(), [Validators.required]),
      priceControl: new FormControl(0, [Validators.required]),
      numberOfGuestsControl: new FormControl(1, [Validators.required]),
      checkIn: new FormControl(false),
    });
    this.viewBookingForm = this.fb.group({
      nameControl: new FormControl({ value: '', disabled: true }),
      phoneNumberControl: new FormControl({ value: 0, disabled: true }),
      emailControl: new FormControl({ value: '', disabled: true }),
      createdAtControl: new FormControl({ value: '', disabled: true }),
      checkInDateControl: new FormControl({ value: new Date(), disabled: true }),
      checkOutDateControl: new FormControl({ value: new Date(), disabled: true }),
      priceControl: new FormControl({ value: 0, disabled: true }),
      numberOfGuestsControl: new FormControl({ value: 1, disabled: true }),
      employeeUserNameControl: new FormControl({ value: '', disabled: true }),
      roomControl: new FormControl({
        value: new Room(0, this.newRoomDescription, false),
        disabled: true,
      }),
      checkIn: new FormControl({ value: false, disabled: true }),
    });
    this.findAllBookings();
  }

  findAllBookings(): void {
    this.httpService.getAllBookings().subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.foundBookings.set(data);
          this.filteredBookings.set(data);
        }
      },
      error: (err) => console.error(err),
    });
  }

  get nameControl() {
    return this.viewBookingForm.get('nameControl') as FormControl;
  }

  get phoneNumberControl() {
    return this.viewBookingForm.get('phoneNumberControl') as FormControl;
  }

  get emailControl() {
    return this.viewBookingForm.get('emailControl') as FormControl;
  }

  get createdAtControl() {
    return this.viewBookingForm.get('createdAtControl') as FormControl;
  }

  get checkInDateControl() {
    return this.viewBookingForm.get('checkInDateControl') as FormControl;
  }

  get checkOutDateControl() {
    return this.viewBookingForm.get('checkOutDateControl') as FormControl;
  }

  get priceControl() {
    return this.viewBookingForm.get('priceControl') as FormControl;
  }

  get numberOfGuestsControl() {
    return this.viewBookingForm.get('numberOfGuestsControl') as FormControl;
  }

  get employeeUserNameControl() {
    return this.viewBookingForm.get('employeeUserNameControl') as FormControl;
  }

  get roomControl() {
    return this.viewBookingForm.get('roomControl') as FormControl;
  }

  get checkIn() {
    return this.viewBookingForm.get('checkIn') as FormControl;
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

  openEditModal(booking: Booking | null) {
    this.selectedBooking.set(booking);
    if (booking)
      this.editBookingForm.patchValue({
        nameControl: booking.name,
        createdAtControl: booking.createdAt,
        phoneNumberControl: booking.phoneNumber,
        checkInDateControl: booking.checkInDate,
        checkOutDateControl: booking.checkOutDate,
        emailControl: booking.email,
        priceControl: booking.price,
        numberOfGuestsControl: booking.numberOfGuests,
        guestUserControl: booking.guestUser,
        employeeUserControl: booking.employeeUser,
        roomControl: booking.room,
      });
    this.showEditModal = true;
  }

  openViewModal(booking: Booking | null) {
    this.selectedBooking.set(booking);
    console.log(booking);
    if (booking) {
      this.selectedRoomDescription.set(booking?.room.roomDescription);
      this.viewBookingForm.patchValue({
        nameControl: booking.name,
        createdAtControl: booking.createdAt,
        phoneNumberControl: booking.phoneNumber,
        checkInDateControl: booking.checkInDate,
        checkOutDateControl: booking.checkOutDate,
        emailControl: booking.email,
        priceControl: booking.price,
        numberOfGuestsControl: booking.numberOfGuests,
        guestUserControl: booking.guestUser,
        employeeUserControl: booking.employeeUser?.firstName + ' ' + booking.employeeUser?.lastName,
        roomControl: booking.room,
      });
    }
    this.showViewModal = true;
  }

  // Methods used to open/close the edit booking modal.
  showEditModal = false;

  dispalyEditModal() {
    this.showEditModal = false;
  }

  cancelEditModal() {
    this.showEditModal = false;
  }

  // Methods used to open/close the view booking modal.
  showViewModal = false;

  dispalyViewModal() {
    this.showViewModal = false;
  }

  cancelViewModal() {
    this.showViewModal = false;
  }

  // Methods used to open/close the delete confirmation modal
  showDeleteConfirmation = false;

  openDeleteConfirmation(booking: Booking) {
    this.showDeleteConfirmation = true;
    this.editType.set('delete');
    this.selectedBooking.set(booking);
  }

  confirmDeleteSubmit() {
    this.showDeleteConfirmation = false;
    this.editBookingFormSubmit();
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  // Methods used to open/close the reactivation confirmation modal
  showReactivationConfirmation = false;

  openReactivationConfirmation(booking: Booking) {
    this.showReactivationConfirmation = true;
    this.editType.set('reactivate');
    this.selectedBooking.set(booking);
  }

  confirmReactivationSubmit() {
    this.showReactivationConfirmation = false;
    this.editBookingFormSubmit();
  }

  cancelReactivation() {
    this.showReactivationConfirmation = false;
  }

  // Methods used to open/close the confirmation modal
  showConfirmation = false;

  openConfirmationModal() {
    this.showConfirmation = true;
  }

  confirmSubmit() {
    this.showConfirmation = false;
    this.editBookingFormSubmit();
  }

  cancelSubmit() {
    this.showConfirmation = false;
  }

  // Methods used to open/close the success modal

  showSuccessMessage = false;

  openSuccessModal() {
    this.showSuccessMessage = true;
  }

  closeSuccessModal() {
    this.showSuccessMessage = false;
    this.showEditModal = false;
  }

  editBookingFormSubmit(): void {
    if (this.editType() === 'edit') {
      console.log(
        this.selectedBooking()!.id,
        this.selectedBooking()!.createdAt,
        this.checkInDateControl.value.toISOString().split('T')[0],
        this.checkOutDateControl.value.toISOString().split('T')[0],
        this.priceControl.value,
        this.numberOfGuestsControl.value,
        this.emailControl.value,
        this.nameControl.value,
        this.phoneNumberControl.value,
        this.checkIn.value,
        this.selectedBooking()!.guestUser,
        this.selectedBooking()?.employeeUser ?? null,
        this.roomControl.value,
        false,
      );
      // If the submission type is edit, hits this endpoint and updates the user
      if (this.selectedBooking() && this.selectedBooking()?.id != null) {
        if (this.selectedBooking !== null) {
          const updatedBooking = new Booking(
            this.selectedBooking()!.id,
            this.selectedBooking()!.createdAt,
            this.checkInDateControl.value.toISOString().split('T')[0],
            this.checkOutDateControl.value.toISOString().split('T')[0],
            this.priceControl.value,
            this.numberOfGuestsControl.value,
            this.emailControl.value,
            this.nameControl.value,
            this.phoneNumberControl.value,
            this.checkIn.value,
            this.selectedBooking()!.guestUser,
            this.selectedBooking()?.employeeUser ?? null,
            this.roomControl.value,
            false,
          );
          this.httpService.updateBooking(updatedBooking).subscribe({
            next: () => {
              this.openSuccessModal();
              this.findAllBookings();
            },
            error: (err) => console.error(err),
          });
        }
      } else if (this.editType() === 'delete') {
      } else if (this.editType() === 'reactivate') {
      }
    }
  }
}
