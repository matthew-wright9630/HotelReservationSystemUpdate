import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoomDescription } from '../models/room-description/room-description';
import { User } from '../models/user/user';
import { Room } from '../models/room/room';

@Injectable({
  providedIn: 'root',
})
export class DataPassService {
  // Creates an empty array of selected rooms
  currentRoomSelectionSubject = new BehaviorSubject<RoomDescription[]>([]);

  currentRoomSelectionObservable = this.currentRoomSelectionSubject.asObservable();

  private numberOfRoomsSubject = new BehaviorSubject<number>(1);
  numberOfRoomsObservable = this.numberOfRoomsSubject.asObservable();

  setNumberOfRooms(count: number) {
    this.numberOfRoomsSubject.next(count);
  }

  // Creates a signal to allow the system to use the logged-in employee.
  loggedInUser = signal<User | null>(null);

  // Creates a signal for the total number of rooms.
  totalNumberOfRooms = signal<number>(0);

  // Creates a signal for the eployeeEditRoomForm that records what the room to be updated is.
  editRoomSignal = signal<Room | null>(null);

  // Creates a signal for the eployeeEditRoomForm that records what the room description to be updated is.
  editRoomDescriptionSignal = signal<RoomDescription | null>(null);

  constructor() {}

  // this method tells the subject to update to the new state
  // and emit a change notification to its Observable
  setCurrentRoomSelection(newRoom: RoomDescription[]) {
    this.currentRoomSelectionSubject.next(newRoom);
  }

  // This method adds a room to the current-selection component
  addRoom(room: RoomDescription) {
    const current = this.currentRoomSelectionSubject.value;

    if (current.some((selectedRoom) => selectedRoom.id === room.id)) {
      return;
    }

    this.currentRoomSelectionSubject.next([...current, room]);
  }

  // This method removes a room to the current-selection component
  removeRoom(roomId: number) {
    const current = this.currentRoomSelectionSubject.value;
    const updated = current.filter((selectedRoom) => selectedRoom.id !== roomId);

    this.currentRoomSelectionSubject.next(updated);
  }

  // This method takes a room and allows it to be updated
  // (removed from the array, then added again)
  updateRoom(updatedRoom: RoomDescription) {
    const current = this.currentRoomSelectionSubject.value;

    const updated = current.map((room) => (room.id === updatedRoom.id ? updatedRoom : room));

    this.currentRoomSelectionSubject.next(updated);
  }
}
