import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-component',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css',
})
export class PaymentComponent{

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.paymentForm = this.fb.group({
      cardNumber: new FormControl('', [Validators.required]),
      expirationMonth: new FormControl('', [Validators.required]),
      expirationYear: new FormControl('', [Validators.required]),
      CVC: new FormControl('', [Validators.required]),
      cardHolderName: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required])
    })
  }
}
