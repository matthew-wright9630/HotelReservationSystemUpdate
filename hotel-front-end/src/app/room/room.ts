export class Room {
  //properties
  id: number;
  description: string;
  imageUrl: string;
  maxNumberOfGuests: number;
  price: number;

  //constructor
  constructor(
    id: number,
    description: string,
    imageUrl: string,
    maxNumberOfGuests: number,
    price: number
  ) {
    this.id = id;
    this.description = description;
    this.imageUrl = imageUrl;
    this.maxNumberOfGuests = maxNumberOfGuests;
    this.price = price;
  }
}
