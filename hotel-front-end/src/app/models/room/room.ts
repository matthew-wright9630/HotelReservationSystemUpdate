/**
 * This creates the Room datatype. It contains all the information needed for a Room card displayed on the Room Component.
 */

export class Room {
  roomDescriptionId: number;

  //constructor
  constructor(roomDescriptionId: number) {
    this.roomDescriptionId = roomDescriptionId;
  }
}
