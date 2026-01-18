/**
 * This creates the RoomDescription datatype. It contains all the information needed for a Room card displayed on the Room Component.
 */

export class RoomDescription {
  //properties
  id: number;
  bedStyle: string;
  adaCompliant: boolean;
  isSmoking: boolean;
  roomImage: string;
  maxOccupancy: number;
  price: number;
  isAvailable: boolean;
  roomColor: string;
  deleted: boolean;

  //constructor
  constructor(
    id: number,
    bedStyle: string,
    adaCompliant: boolean,
    isSmoking: boolean,
    roomImage: string,
    maxOccupancy: number,
    price: number,
    isAvailable: boolean,
    roomColor: string,
    deleted: boolean
  ) {
    this.id = id;
    this.bedStyle = bedStyle;
    this.adaCompliant = adaCompliant;
    this.isSmoking = isSmoking;
    this.roomImage = roomImage;
    this.maxOccupancy = maxOccupancy;
    this.price = price;
    this.isAvailable = isAvailable;
    this.roomColor = roomColor;
    this.deleted = deleted;
  }
}
