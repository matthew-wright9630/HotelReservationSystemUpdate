import { Component, Input } from '@angular/core';
import { RoomDescription } from '../models/room-description/room-description';
import { DataPassService } from '../services/data-pass-service';
import { CommonModule } from '@angular/common';

/**
 * The RoomDescription Component accepts a Room datatype and displays it as a card on the website.
 * If the room is not available for the selected dates, then it will display an error on the card.
 */

@Component({
  selector: 'app-room-description-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-description-component.html',
  styleUrl: './room-description-component.css',
})
export class RoomDescriptionComponent {
  @Input() room!: RoomDescription;
  @Input() slotIndex!: number;
  @Input() showErrors = true;
  @Input() showSelect = true;

  constructor(private dataPass: DataPassService) {}

  selectedRoomId: number | null = null;

  ngOnInit() {
    this.dataPass.selectRoomSubject.subscribe((room) => {
      this.selectedRoomId = room?.id ?? null;
    });
  }

  addRoomToBooking(roomDescription: RoomDescription) {
    this.dataPass.selectRoom(roomDescription);
  }
}
