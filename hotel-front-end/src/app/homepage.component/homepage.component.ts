import { Component } from '@angular/core';
import { RoomComponent } from '../room.component/room.component';

@Component({
  selector: 'app-homepage.component',
  imports: [RoomComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
