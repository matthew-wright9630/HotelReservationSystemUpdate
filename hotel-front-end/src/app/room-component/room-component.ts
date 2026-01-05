import { Component, Input } from '@angular/core';
import { Room } from '../models/room/room';
import { CommonModule } from '@angular/common';
import { HttpService } from '../services/http-service';
import { DataPassService } from '../services/data-pass-service';

/**
 * The Room Component accepts a Room datatype and displays it as a card on the website.
 * If the room is not available for the selected dates, then it will display an error on the card.
 */

@Component({
  selector: 'app-room-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-component.html',
  styleUrl: './room-component.css',
})
export class RoomComponent {
  @Input() room!: Room;

  constructor(private dataPass: DataPassService) {}

  addRoomToBooking(room: Room) {
    this.dataPass.addRoom(room);
  }
}
