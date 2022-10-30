import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Token } from "api/BaseApi";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#C5C5C6",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#C5C5C6",
      },
      "::placeholder": {
        color: "#C5C5C6",
      },
    },
    invalid: {
      iconColor: "#C60C0C",
      color: "#C60C0C",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const CheckoutPanier = () => {
  if (!Token) {
    window.location.href = "/connexion";
  }

  const [error] = useState(null);
  const [paymentMethod] = useState(null);

  return paymentMethod ? (
    <Fragment>
      <Container>
        <div className="paymentPage">
          <div className="paymentContainer">
            <div className="text-center" role="alert">
              <img src="assets/icons/earth.png" alt="hello" />
              <h4 className="mt-4">✅ Paiement réussi !</h4>
            </div>
            <div className="text-center">
              <h5>Merci d'avoir soutenu le projet Green Impact</h5>
            </div>
            <br />
            <a href="/">
              <button>Revenir à la page d'accueil</button>
            </a>
          </div>
        </div>
      </Container>
    </Fragment>
  ) : (
    <Fragment>
      <CardField/>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <br />
    </Fragment>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "http://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51J2zN1BheQMru7CfehgdBWKYX2X21WDg8jjlrQPFYdqZPnpTXanEqbe9o3yybyOGqwiisOsKBT5IXB8D5K66RlFf00RjGv8upN"
);

const App = () => {
  return (
    <div className="AppWrapper">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutPanier />
      </Elements>
    </div>
  );
};

export default App;
