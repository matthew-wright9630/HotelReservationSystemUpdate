import { Injectable, Input, Signal, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RoomDescription } from '../models/room-description/room-description';
import { User } from '../models/user/user';
import { Room } from '../models/room/room';
import { RoomSelectionInterface } from '../interfaces/room-selection-interface';
import { RoomSearchInterface } from '../interfaces/room-search-interface';

@Injectable({
  providedIn: 'root',
})
export class DataPassService {
  // Creates an empty array of selected rooms
  currentRoomSelectionSubject = new BehaviorSubject<RoomSelectionInterface | null>(null);

  currentSlotIndexSubject = new BehaviorSubject<number | null>(null);

  setCurrentSlot(i: number) {
    this.currentSlotIndexSubject.next(i);
  }

  selectRoomSubject = new Subject<RoomDescription | null>();

  selectRoom(room: RoomDescription | null) {
    this.selectRoomSubject.next(room);
  }

  currentRoomSelectionObservable = this.currentRoomSelectionSubject.asObservable();

  private numberOfRoomsSubject = new BehaviorSubject<number>(4);
  numberOfRoomsObservable = this.numberOfRoomsSubject.asObservable();

  setNumberOfRooms(count: number) {
    this.numberOfRoomsSubject.next(count);
  }

  bookingSearchSignal = signal<RoomSearchInterface | null>(null);

  // Creates a signal to allow the system to use the logged-in employee.
  loggedInUser = signal<User | null>(null);

  // Creates a signal for the total number of rooms to book.
  totalNumberOfRooms = signal<number>(4);

  // Creates a signal for the eployeeEditRoomForm that records what the room to be updated is.
  editRoomSignal = signal<Room | null>(null);

  // Creates a signal for the eployeeEditRoomForm that records what the room description to be updated is.
  editRoomDescriptionSignal = signal<RoomDescription | null>(null);

  constructor() {}

  // this method tells the subject to update to the new state
  // and emit a change notification to its Observable
  setCurrentRoomSelection(newRoomSelection: RoomSelectionInterface) {
    this.currentRoomSelectionSubject.next(newRoomSelection);
  }

  currentSelectionSignal: Signal<Room[] | null> = signal<Room[] | null>([]);
}
