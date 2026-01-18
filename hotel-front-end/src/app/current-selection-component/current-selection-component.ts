import { Component, computed, effect, signal } from '@angular/core';
import { HttpService } from '../services/http-service';
import { CommonModule } from '@angular/common';
import { RoomDescription } from '../models/room-description/room-description';
import { DataPassService } from '../services/data-pass-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoomDescriptionComponent } from '../room-description-component/room-description-component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-current-selection-component',
  standalone: true,
  imports: [CommonModule, RoomDescriptionComponent, ReactiveFormsModule],
  templateUrl: './current-selection-component.html',
  styleUrl: './current-selection-component.css',
})
// This class creates the current selection (reservation summary to users).
// It will display the number of rooms that need to be selected and any rooms that have been selected.
export class CurrentSelectionComponent {
  bookingSelectionForm: FormGroup;

  selectedSlotIndex = signal<number>(0);
  roomsArray = signal<number[]>([]);

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dataPass: DataPassService
  ) {
    this.bookingSelectionForm = this.fb.group({
      roomDescriptionControl: this.fb.array(
        Array(this.dataPass.totalNumberOfRooms())
          .fill(null)
          .map(() => new FormControl<RoomDescription | null>(null))
      ),
    });
    this.dataPass.currentRoomSelectionObservable.subscribe((selection) => {
      if (!selection) {
        return;
      }
      this.updateRoomDescriptionControl(selection.slotIndex, selection.roomDescription);
    });
    this.pickSlot(0);

    effect(() => {
      const searchValue = this.dataPass.bookingSearchSignal();
      if (searchValue) this.roomsArray.set(searchValue?.rooms);
      this.bookingSelectionForm = this.fb.group({
        roomDescriptionControl: this.fb.array(
          Array(this.dataPass.totalNumberOfRooms())
            .fill(null)
            .map(() => new FormControl<RoomDescription | null>(null))
        ),
      });
    });
  }

  updateRoomDescriptionControl(slotIndex: number, room: RoomDescription): void {
    this.roomDescriptionArray.at(slotIndex).setValue(room);
  }

  get roomDescriptionArray() {
    return this.bookingSelectionForm.get('roomDescriptionControl') as FormArray;
  }

  // Determines what the selected slot is. It then resets the selectRoom signal so that the room is not added to the selected slot automatically.
  pickSlot(i: number) {
    this.dataPass.selectRoom(null);
    this.dataPass.setCurrentSlot(i);
  }

  // Gets the slot index and selected room from the HTML and sends it to the dataPass.
  // Then gets the response form dataPass and updates the selection component.
  ngOnInit() {
    combineLatest([
      this.dataPass.currentSlotIndexSubject,
      this.dataPass.selectRoomSubject,
    ]).subscribe(([slotIndex, room]) => {
      if (slotIndex !== null && room) {
        this.updateRoomDescriptionControl(slotIndex, room);
      }
    });

    this.dataPass.currentSlotIndexSubject.subscribe((index) => {
      if (index) {
        this.selectedSlotIndex.set(index);
      }
    });
  }

  // Gets the total price of all selected rooms.
  get totalPrice(): number {
    const roomArray = this.bookingSelectionForm.get('roomDescriptionControl') as FormArray;
    return roomArray.controls.reduce((sum, control) => {
      const room = control.value as RoomDescription;
      return sum + (room?.price || 0);
    }, 0);
  }

  // Checks if the correct number of rooms have been selected for booking.
  bookingButtonAvailable(): boolean {
    let allRoomSelected: boolean = true;
    const roomArray = this.bookingSelectionForm.get('roomDescriptionControl') as FormArray;
    roomArray.controls.forEach((room) => {
      if (room?.value === null) {
        allRoomSelected = false;
      }
    });
    return allRoomSelected;
  }

  // Gets the total number of rooms from dataPass, then creates the room slots (to display the room boxes on the screen.)
  roomSlots = computed(() => Array.from({ length: this.dataPass.totalNumberOfRooms() }));

  // Methods used to open/close the confirmation modal
  showConfirmation = false;

  openConfirmationModal() {
    if (!this.bookingSelectionForm.valid) {
      return;
    }
    this.showConfirmation = true;
  }

  confirmSubmit() {
    this.showConfirmation = false;
    this.bookingSelectionSubmit();
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
  }

  // Submits the form with the selected rooms and sends it to the booking component.
  bookingSelectionSubmit(): void {
    console.log('Booking submit');
  }
}
