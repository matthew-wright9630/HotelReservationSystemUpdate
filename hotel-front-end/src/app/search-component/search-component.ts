import { Component, signal } from '@angular/core';
import { RoomDescription } from '../models/room-description/room-description';
import { CommonModule } from '@angular/common';
import { BookingNavbarComponent } from '../booking-navbar-component/booking-navbar-component';
import { HttpService } from '../services/http-service';
import { CurrentSelectionComponent } from '../current-selection-component/current-selection-component';
import { RoomDescriptionComponent } from '../room-description-component/room-description-component';
import { Observable } from 'rxjs';
import { DataPassService } from '../services/data-pass-service';
import { FrontPageComponent } from '../front-page-component/front-page-component';
import { Employee } from '../employee/employee';

/**
 * The Homepage component is the first page that guests will see when entering the website. It pulls a list of rooms from
 * the database and renders it via the RoomDescription component.
 * It also displays the current selection of rooms a guest has picked.
 */

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [
    CommonModule,
    RoomDescriptionComponent,
    CurrentSelectionComponent,
    BookingNavbarComponent,
    FrontPageComponent,
  ],
  templateUrl: './search-component.html',
  styleUrl: './search-component.css',
})
export class SearchComponent {
  // Creates the httpService needed to get API responses from server
  constructor(private httpService: HttpService, private dataPassService: DataPassService) {
    this.addRoomToHomepage();
    // this.getAvailableRooms();
    // this.getAvailableRoomDescriptions();
  }

  // This creates a signal to roomDescriptions array.
  roomDescriptions = signal<RoomDescription[]>([]);

  // Gets all available rooms (based on the date)
  getAvailableRooms() {
    const currentDate: Date = new Date();
    const tomorrowDate: Date = new Date();
    this.httpService.getAllAvailableRooms(currentDate, tomorrowDate).subscribe((data) => {});
  }

  // Gets all available room descriptions (based on the date)
  getAvailableRoomDescriptions() {
    const currentDate: Date = new Date();
    const tomorrowDate: Date = new Date();
    this.httpService
      .getAllAvailableRoomDescriptions(currentDate, tomorrowDate)
      .subscribe((data) => {});
  }

  // This will update whether or not a room is available to book (based on the date).
  // It then updates the isAvailable property and enables/disables the Select button.
  updateRoomAvailability(roomDescriptions: RoomDescription[]) {
    roomDescriptions.map((room) => {
      this.checkRoomDescriptionIsAvailable(room).subscribe((available) => {
        room.isAvailable = available;
        this.roomDescriptions.set([...roomDescriptions]);
      });
    });
  }

  // Checks whether a room is available to select (based on the date).
  checkRoomDescriptionIsAvailable(room: RoomDescription): Observable<boolean> {
    return this.httpService.checkRoomDescriptionIsAvailable(room.id, new Date(), new Date());
  }

  // Used to add all rooms to the homepage
  addRoomToHomepage() {
    this.httpService.getAllRoomDescriptions().subscribe((data) => {
      const mappedRooms =
        data.body?.map((newRoom) => {
          // this.updateRoomAvailability(newRoom);
          return new RoomDescription(
            newRoom.id,
            newRoom.bedStyle,
            newRoom.adaCompliant,
            newRoom.isSmoking,
            newRoom.roomImage,
            newRoom.maxOccupancy,
            newRoom.price,
            newRoom.isAvailable,
            newRoom.roomColor
          );
        }) || [];
      this.roomDescriptions.set(mappedRooms);

      this.updateRoomAvailability(mappedRooms);
    });
  }
}
