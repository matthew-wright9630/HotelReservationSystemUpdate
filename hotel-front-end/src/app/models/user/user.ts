export class User {
  id: number;
  role: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  phoneNumber: number;

  constructor(
    id: number,
    role: string,
    email: string,
    firstName: string,
    middleName: string,
    lastName: string,
    address: string,
    phoneNumber: number
  ) {
    this.id = id;
    this.role = role;
    this.email = email;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
  }
}
