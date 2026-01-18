/**
 * This creates the Room datatype. It contains all the information needed for a Room card displayed on the Room Component.
 */

import { RoomDescription } from '../room-description/room-description';

export class Room {
  id: number;
  roomDescription: RoomDescription;
  deleted: boolean;

  //constructor
  constructor(id: number, roomDescription: RoomDescription, deleted: boolean) {
    this.id = id;
    this.roomDescription = roomDescription;
    this.deleted = deleted;
  }
}
