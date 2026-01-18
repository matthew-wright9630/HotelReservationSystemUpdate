import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../services/http-service';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs/operators';
import { Stripe, StripeEmbeddedCheckout } from '@stripe/stripe-js';
import { CheckoutService } from '../services/checkout-service';

@Component({
  selector: 'app-payment-component',
  imports: [],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css',
})
export class PaymentComponent implements OnInit{
  
  @ViewChild('checkoutElement') checkoutElement!: ElementRef;
  private stripe: Stripe | null = null;
  private embeddedCheckout: StripeEmbeddedCheckout | null = null;

  constructor(private checkoutService: CheckoutService) {}

  async ngOnInit(): Promise<void> {
    this.stripe = await this.checkoutService.getStripePromise();

    if (this.stripe) {
      // Use fetchClientSecret callback for better performance
      this.embeddedCheckout = await this.stripe.initEmbeddedCheckout({
        fetchClientSecret: () => this.checkoutService.fetchClientSecret(),
        onComplete: () => {
          // Optional: handle completion event if needed
          console.log("Checkout complete!");
        }
      });

      this.embeddedCheckout.mount(this.checkoutElement.nativeElement);
    }
  }
  
  ngOnDestroy(): void {
    // Always destroy the instance to prevent memory leaks and "multiple instance" errors
    if (this.embeddedCheckout) {
      this.embeddedCheckout.destroy(); //
    }
  }
  
  
  /* constructor(
    private httpService: HttpService,
    private stripeService: StripeService
  ){
    
  }

  checkout(): void {
    // Make a request to the backend to create a Checkout Session
    this.httpService.post<{ sessionId: string }>('checkout/create-checkout-session', {})
      .pipe(
        switchMap(session => {
          // Redirect to the Stripe-hosted page or embed the form
          return this.stripeService.redirectToCheckout({ sessionId: session.sessionId });
        })
      )
      .subscribe(result => {
        if (result.error) {
          // If redirectToCheckout fails, display the error
          alert(result.error.message);
        }
      });
  } */
}
