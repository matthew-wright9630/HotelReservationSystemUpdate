import { Component, computed, signal } from '@angular/core';
import { HttpService } from '../services/http-service';
import { CommonModule } from '@angular/common';
import { RoomDescription } from '../models/room-description/room-description';
import { DataPassService } from '../services/data-pass-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoomDescriptionComponent } from '../room-description-component/room-description-component';

@Component({
  selector: 'app-current-selection-component',
  standalone: true,
  imports: [CommonModule, RoomDescriptionComponent],
  templateUrl: './current-selection-component.html',
  styleUrl: './current-selection-component.css',
})
// This class creates the current selection (reservation summary to users).
// It will display the number of rooms that need to be selected and any rooms that have been selected.
export class CurrentSelectionComponent {
  // A signal is created to get the selected room, how many rooms to select, and the current room number (for updating) from the data-pass-service

  selectedRooms = signal<RoomDescription[]>([]);

  selectedCount = computed(() => this.selectedRooms().length);

  currentRoomNumber = computed(() => this.selectedCount() + 1);

  // Constructor for injecting the httpService and dataPass.
  constructor(private httpService: HttpService, private dataPass: DataPassService) {
    this.dataPass.currentRoomSelectionObservable.subscribe((rooms) => {
      this.selectedRooms.set(rooms);
    });

    this.dataPass.currentRoomSelectionObservable
      .pipe(takeUntilDestroyed())
      .subscribe((rooms) => this.selectedRooms.set(rooms));
  }

  get totalPrice(): number {
    return this.selectedRooms().reduce((sum, room) => sum + room.price, 0);
  }

  // Checks if the correct number of rooms have been selected for booking.
  bookingButtonAvailable(): boolean {
    return this.selectedRooms().length === this.mockBooking.numberOfRooms;
  }

  // Mock data that will need to be updated.
  mockBooking = {
    numberOfRooms: 2,
  };

  roomSlots = computed(() => Array.from({ length: this.mockBooking.numberOfRooms }));

  mockNumberOfGuests4 = {
    numberOfGuests: 4,
  };

  mockNumberOfGuests2 = {
    numberOfGuests: 2,
  };
}
