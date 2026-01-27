import { Component, effect, signal } from '@angular/core';
import { RoomDescription } from '../models/room-description/room-description';
import { CommonModule } from '@angular/common';
import { BookingNavbarComponent } from '../booking-navbar-component/booking-navbar-component';
import { HttpService } from '../services/http-service';
import { CurrentSelectionComponent } from '../current-selection-component/current-selection-component';
import { RoomDescriptionComponent } from '../room-description-component/room-description-component';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { DataPassService } from '../services/data-pass-service';
import { FrontPageComponent } from '../front-page-component/front-page-component';
import { RoomSearchInterface } from '../interfaces/room-search-interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';

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
    ReactiveFormsModule,
    MatSidenavModule,
  ],
  templateUrl: './search-component.html',
  styleUrl: './search-component.css',
})
export class SearchComponent {
  // Creates the httpService needed to get API responses from server
  constructor(
    private httpService: HttpService,
    private dataPassService: DataPassService,
  ) {
    this.addRoomToHomepage();

    effect(() => {
      const searchValue = this.dataPassService.bookingSearchSignal();
      this.updateRoomSearch(searchValue);
    });
  }

  // Variables used for the search bar.
  filterControl = new FormControl('');
  filteredRoomDescriptions = signal<RoomDescription[]>([]);

  // This creates a signal to roomDescriptions array.
  roomDescriptions = signal<RoomDescription[]>([]);

  // Gets all available rooms (based on the date)
  getAvailableRooms() {
    const currentDate: Date = new Date();
    const tomorrowDate: Date = new Date();
    this.httpService.getAllAvailableRooms(currentDate, tomorrowDate).subscribe((data) => {});
  }

  // Gets all available room descriptions (based on the date)
  getAvailableRoomDescriptions(startDate: string, endDate: string) {
    const currentDate: string = startDate;
    const tomorrowDate: string = endDate;
    this.httpService
      .getAllAvailableRoomDescriptions(currentDate, tomorrowDate)
      .subscribe((data) => {
        this.updateRoomAvailability(data.body);
      });
  }

  // This will update whether or not a room is available to book (based on the date).
  // It then updates the isAvailable property and enables/disables the Select button.
  updateRoomAvailability(roomDescriptions: RoomDescription[] | null) {
    if (roomDescriptions)
      roomDescriptions.map((room) => {
        this.checkRoomDescriptionIsAvailable(room).subscribe((available) => {
          room.isAvailable = available;
          this.roomDescriptions.set([...roomDescriptions]);
          this.filteredRoomDescriptions.set([...roomDescriptions]);
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
        data.body
          ?.filter((newRoom) => !newRoom.deleted)
          .map((newRoom) => {
            return new RoomDescription(
              newRoom.id,
              newRoom.bedStyle,
              newRoom.adaCompliant,
              newRoom.isSmoking,
              newRoom.roomImage,
              newRoom.maxOccupancy,
              newRoom.price,
              newRoom.isAvailable,
              newRoom.roomColor,
              newRoom.deleted,
            );
          }) || [];
      this.roomDescriptions.set(mappedRooms);

      this.updateRoomAvailability(mappedRooms);
    });
  }

  // Update the search result from the booking navbar
  updateRoomSearch(searchValue: RoomSearchInterface | null) {
    if (searchValue) {
      this.dataPassService.totalNumberOfRooms.set(searchValue.rooms.length);
      this.getAvailableRoomDescriptions(searchValue.checkInDate, searchValue.checkOutDate);
    }
  }

  ngOnInit() {
    // On init, subscribes to the change of searchControl and applies a filter based on its value.
    this.filterControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value) => this.applyFilter(value ?? ''));
  }

  // Applys filtering to the room description table.
  applyFilter(query: string) {
    // If the query is null, removes the filter and applys the full room description list.
    if (query === null) {
      this.filteredRoomDescriptions.set(this.roomDescriptions());
    }
    const queryString = query.toLowerCase();

    const roomDescriptionList = this.roomDescriptions();

    const results = roomDescriptionList.filter((roomDescription) => {
      // Checks the search against each of the fields and returns any rows that match the provided query.
      return (
        roomDescription.bedStyle.toLowerCase().includes(queryString) ||
        roomDescription.roomColor.toLowerCase().includes(queryString)
      );
    });
    this.filteredRoomDescriptions.set(results);
  }
}
