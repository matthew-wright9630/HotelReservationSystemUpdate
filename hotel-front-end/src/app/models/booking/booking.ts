import { Room } from '../room/room';
import { User } from '../user/user';

export class Booking {
  id: number;
  createdAt: Date;
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
  numberOfGuests: number;
  email: string;
  name: string;
  phoneNumber: number;
  checkedIn: boolean;
  guestUser: User;
  employeeUser: User | null;
  room: Room;
  deleted: boolean;

  constructor(
    id: number,
    createdAt: Date,
    checkInDate: Date,
    checkOutDate: Date,
    price: number,
    numberOfGuests: number,
    email: string,
    name: string,
    phoneNumber: number,
    checkedIn: boolean,
    guestUser: User,
    employeeUser: User | null,
    room: Room,
    deleted: boolean,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.price = price;
    this.numberOfGuests = numberOfGuests;
    this.email = email;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.checkedIn = checkedIn;
    this.guestUser = guestUser;
    this.employeeUser = employeeUser;
    this.room = room;
    this.deleted = deleted;
  }
}
