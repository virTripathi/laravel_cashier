<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Payment Gateway: Stripe</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            /* display: flex; */
            /* flex-direction: column; */
            width: 100vw;
            height: 100vh;
            background-color: #f2f2f2;
            font-family: 'Nunito', sans-serif;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>
<body>
    
    <input id="card-holder-name" type="text">
    <div id="card-element"></div>
    <button id="card-button" data-secret="{{ $intent->client_secret }}">
        Subscribe
    </button>
</body>
<script src="https://js.stripe.com/v3/"></script>
    <script>
        const stripe = Stripe('stripe-public-key');
        const elements = stripe.elements();
        var cardElement = elements.create('card', {
  style: {
    base: {
        width:'100vh',
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87BBFD',
      },
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE',
    },
  },
});
        cardElement.mount('#card-element');
    </script>
    <script>
        const cardHolderName = document.getElementById('card-holder-name');
        const cardButton = document.getElementById('card-button');
        const clientSecret = cardButton.dataset.secret;
        cardButton.addEventListener('click', async (e) => {
        const { setupIntent, error } = await stripe.confirmCardSetup(
            clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: { name: cardHolderName.value }
                }
            }
        ); 
        if (error) {
            // Display "error.message" to the user...
        } else {
            // The card has been verified successfully...
        }
    });
    </script>
</html>