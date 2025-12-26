import { Component, Input } from '@angular/core';
import { Room } from '../room/room';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-component.html',
  styleUrl: './room-component.css',
})
export class RoomComponent {
  @Input() room!: Room;

  addRoomToBooking(room: Room) {
    console.log(room);
  }
}
