import { Component } from '@angular/core';
import { RoomComponent } from '../room-component/room-component';
import { Room } from '../room/room';
import { CommonModule } from '@angular/common';

/**
 * The Homepage component is the first page that guests will see when entering the website. It pulls a list of rooms from
 * the database and renders it via the Room component.
 * It also displays the current selection of rooms a guest has picked.
 */

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
    new Room(
      3,
      'Executive Suite, Smoking, Ravenclaw style',
      'assets/ravenclaw_room.png',
      4,
      325.0,
      true
    ),
  ];
}
