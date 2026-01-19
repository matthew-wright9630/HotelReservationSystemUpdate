package com.skillstorm.hotel_reservation_system.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    @Value("${FRONTEND_BASE_URL}")
    private String DOMAIN; // To be replaced with AWS deployment

    // custom application property
    @Value("${stripe.secret.key}")
    private String secretKey;

    // execute after bean construction and dependency injection
    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    @PostMapping("/create-session")
    public ResponseEntity<String> createCheckoutSession(@RequestParam String priceId) throws Exception {
        SessionCreateParams params = SessionCreateParams.builder()
                .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(priceId) // Use a predefined Price ID from the Stripe Dashboard
                                .setQuantity(1L)
                                .build())
                .setReturnUrl(DOMAIN + "/return?session_id={CHECKOUT_SESSION_ID}")
                .build();

        Session session = Session.create(params);
        return new ResponseEntity<>(session.getClientSecret(), HttpStatus.OK);
    }
}
