import { Component, Input } from '@angular/core';
import { Room } from '../room/room';

@Component({
  selector: 'app-room.component',
  imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  @Input() room: Room = new Room(0, '', '', 0, 0);
}
