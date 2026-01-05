/**
 * This creates the Room datatype. It contains all the information needed for a Room card displayed on the Room Component.
 */

export class Room {
  //properties
  id: number;
  bedStyle: string;
  adaCompliant: boolean;
  isSmoking: boolean;
  // description: string;
  imageUrl: string;
  maxOccupancy: number;
  price: number;
  isAvailable: boolean;
  roomColors: string;

  //constructor
  constructor(
    id: number,
    // description: string,
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
    // this.description = description;
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
