export class User {
  id: number;
  role: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  phoneNumber: number;
  onboardingComplete: boolean;
  deleted: boolean;

  constructor(
    id: number,
    role: string,
    email: string,
    firstName: string,
    middleName: string,
    lastName: string,
    address: string,
    phoneNumber: number,
    onboardingComplete: boolean,
    deleted: boolean
  ) {
    this.id = id;
    this.role = role;
    this.email = email;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.onboardingComplete = onboardingComplete;
    this.deleted = deleted;
  }
}
