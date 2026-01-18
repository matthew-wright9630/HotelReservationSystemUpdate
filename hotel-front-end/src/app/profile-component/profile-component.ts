import { Component, signal } from '@angular/core';
import { User } from '../models/user/user';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataPassService } from '../services/data-pass-service';
import { HttpService } from '../services/http-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})
export class ProfileComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dataPass: DataPassService
  ) {
    this.profileForm = this.fb.group({
      firstNameControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      lastNameControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      middleNameControl: new FormControl(''),
      homeAddressControl: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(2),
      ]),
      phoneNumberControl: new FormControl(0, [
        Validators.required,
        // Enforces that it must be a 10 digit number.
        Validators.pattern('^[0-9]{10}$'),
      ]),
      onboardingControl: new FormControl(false),
    });
    this.getLoginDetails();
  }

  // Get methods for all the form fields.

  get firstNameControl() {
    return this.profileForm.get('firstNameControl');
  }

  get lastNameControl() {
    return this.profileForm.get('lastNameControl');
  }

  get middleNameControl() {
    return this.profileForm.get('middleNameControl');
  }

  get homeAddressControl() {
    return this.profileForm.get('homeAddressControl');
  }

  get phoneNumberControl() {
    return this.profileForm.get('phoneNumberControl');
  }

  get onboardingControl() {
    return this.profileForm.get('onboardingControl');
  }

  // Gets the lagin details from the httpService and passes it into the loggedInUser.
  getLoginDetails() {
    this.httpService.getUserInfo().subscribe((data) => {
      this.dataPass.loggedInUser.set(data);
      this.profileForm.patchValue({
        firstNameControl: data.firstName,
        lastNameControl: data.lastName,
        middleNameControl: data.middleName,
        homeAddressControl: data.address,
        phoneNumberControl: data.phoneNumber,
        onboardingControl: data.onboardingComplete,
      });
    });
  }

  // Methods used to open/close the confirmation modal
  showConfirmation = false;

  openConfirmationModal() {
    if (!this.profileForm.valid) {
      return;
    }
    this.showConfirmation = true;
  }

  confirmSubmit() {
    this.showConfirmation = false;
    this.profileFormSubmit();
  }

  cancelSubmit() {
    this.showConfirmation = false;
  }

  // Methods used to open/close the success modal

  showSuccessMessage = signal(false);

  openSuccessModal() {
    this.showSuccessMessage.set(true);
  }

  closeSuccessModal() {
    this.showSuccessMessage.set(false);
  }

  profileFormSubmit(): void {
    const user = this.dataPass.loggedInUser();
    if (user && user.id != null) {
      const updatedUser = new User(
        user.id,
        user.role,
        user.email,
        this.firstNameControl?.value,
        this.middleNameControl?.value,
        this.lastNameControl?.value,
        this.homeAddressControl?.value,
        this.phoneNumberControl?.value,
        user.onboardingComplete,
        user.deleted
      );
      this.httpService.updateProfile(updatedUser).subscribe({
        next: () => {
          this.openSuccessModal();
          this.getLoginDetails();
        },
        error: (err) => console.error(err),
      });
    }
  }
}
