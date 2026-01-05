/**
 * This creates the RoomDescription datatype. It contains all the information needed for a Room card displayed on the Room Component.
 */

export class RoomDescription {
  //properties
  id: number;
  bedStyle: string;
  adaCompliant: boolean;
  isSmoking: boolean;
  imageUrl: string;
  maxOccupancy: number;
  price: number;
  isAvailable: boolean;
  roomColors: string;

  //constructor
  constructor(
    id: number,
    bedStyle: string,
    adaCompliant: boolean,
    isSmoking: boolean,
    imageUrl: string,
    maxOccupancy: number,
    price: number,
    isAvailable: boolean,
    roomColors: string
  ) {
    this.id = id;
    this.bedStyle = bedStyle;
    this.adaCompliant = adaCompliant;
    this.isSmoking = isSmoking;
    this.imageUrl = imageUrl;
    this.maxOccupancy = maxOccupancy;
    this.price = price;
    this.isAvailable = isAvailable;
    this.roomColors = roomColors;
  }
}
