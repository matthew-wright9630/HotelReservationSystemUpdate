/**
 * This creates the Room datatype. It contains all the information needed for a Room card displayed on the Room Component.
 */

export class Room {
  //properties
  id: number;
  description: string;
  imageUrl: string;
  maxNumberOfGuests: number;
  price: number;
  isAvailable: boolean;

  //constructor
  constructor(
    id: number,
    description: string,
    imageUrl: string,
    maxNumberOfGuests: number,
    price: number,
    isAvailable: boolean
  ) {
    this.id = id;
    this.description = description;
    this.imageUrl = imageUrl;
    this.maxNumberOfGuests = maxNumberOfGuests;
    this.price = price;
    this.isAvailable = isAvailable;
  }
}
