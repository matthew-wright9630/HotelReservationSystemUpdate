import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private stripePromise: Promise<Stripe | null>;
  private backendUrl = 'http://localhost:8080/checkout';

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(
      'pk_test_51Sof2jCbjOnIK0DDxQdL6oBvqkDwxONbxxmgZDSsfHCyMWPytjalPulCx9aiQmgJI0vw6dw2LP29jJOAKYpB84Th00j5ySgGLH',
    );
  }

  async fetchClientSecret(): Promise<string> {
    // Call your backend endpoint to create a Checkout Session and return the client_secret
    const response = await firstValueFrom(
      this.http.post<{ clientSecret: string }>(`${this.backendUrl}/create-checkout-session`, {
        items: [{ id: 'prod_TmJzWxqjcc671o', quantity: 1 }], // Example data
      }),
    );
    return response.clientSecret;
  }

  getStripePromise(): Promise<Stripe | null> {
    return this.stripePromise;
  }
}
