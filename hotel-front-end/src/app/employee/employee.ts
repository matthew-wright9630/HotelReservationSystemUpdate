export class Employee {
  id: number;
  role: string;
  email: string;
  firstName: string;
  middleName: string;
  homeAddress: string;
  phoneNumber: number;

  constructor(
    id: number,
    role: string,
    email: string,
    firstName: string,
    middleName: string,
    homeAddress: string,
    phoneNumber: number
  ) {
    this.id = id;
    this.role = role;
    this.email = email;
    this.firstName = firstName;
    this.middleName = middleName;
    this.homeAddress = homeAddress;
    this.phoneNumber = phoneNumber;
  }
}
