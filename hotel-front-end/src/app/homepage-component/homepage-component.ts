import { Component } from '@angular/core';
import { RoomComponent } from '../room-component/room-component';
import { Room } from '../room/room';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage-component',
  standalone: true,
  imports: [CommonModule, RoomComponent],
  templateUrl: './homepage-component.html',
  styleUrl: './homepage-component.css',
})
export class HomepageComponent {
  rooms: Room[] = [
    new Room(
      0,
      '1 King Bed, Non-Smoking, Griffindor style',
      'assets/griffindor_room.png',
      2,
      175.0,
      true
    ),
    new Room(
      1,
      '2 Full Beds, Non-Smoking, Slytherin style',
      'assets/slytherin_room.png',
      4,
      168.0,
      true
    ),
    new Room(
      2,
      '2 Queen Beds, Smoking, Hufflepuff style',
      'assets/hufflepuff_room.png',
      4,
      182.0,
      false
    ),
  ];
}
