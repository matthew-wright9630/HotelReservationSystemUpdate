import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../services/http-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './onboarding-component.html',
  styleUrl: './onboarding-component.css',
})
export class OnboardingComponent {
  onboardingForm: FormGroup;

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.onboardingForm = this.fb.group({
      firstNameControl: new FormControl('', [
        Validators.required,
        Validators.max(255),
        Validators.min(2),
      ]),
      lastNameControl: new FormControl('', [
        Validators.required,
        Validators.max(255),
        Validators.min(2),
      ]),
      middleNameControl: new FormControl(''),
      homeAddressControl: new FormControl('', [
        Validators.required,
        Validators.max(255),
        Validators.min(2),
      ]),
      phoneNumberControl: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
    });
  }

  get firstNameControl() {
    return this.onboardingForm.get('firstNameControl');
  }

  get lastNameControl() {
    return this.onboardingForm.get('lastNameControl');
  }

  get middleNameControl() {
    return this.onboardingForm.get('middleNameControl');
  }

  get homeAddressControl() {
    return this.onboardingForm.get('homeAddressControl');
  }

  get phoneNumberControl() {
    return this.onboardingForm.get('phoneNumberControl');
  }

  // Methods used to open/close the confirmation modal
  showConfirmation = false;

  openConfirmationModal() {
    if (!this.onboardingForm.valid) {
      return;
    }
    this.showConfirmation = true;
  }

  confirmSubmit() {
    this.showConfirmation = false;
    this.onboardingFormSubmit();
  }

  cancelSubmit() {
    this.showConfirmation = false;
  }

  // Methods used to open/close the success modal

  showSuccessMessage = false;

  openSuccessModal() {
    this.showSuccessMessage = true;
  }

  closeSuccessModal() {
    this.showSuccessMessage = false;
  }

  onboardingFormSubmit(): void {}
}
