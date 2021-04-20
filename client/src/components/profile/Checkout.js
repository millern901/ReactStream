import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = "pk_test_51IQJj7J37qmk2Gejn9s10LeCsuKOzN5oFpCBRROWmBCg3IkfdJVoKiF4hS0eNSpGLK6lGfbeYd5pqijMU22muHHo00e0VfqHcC";

const onToken = (user,checkout) => token => 
    checkout(user, token.id);

const Checkout = ({ amount, user, checkout }) => 
    <StripeCheckout
      amount={amount*100}
      token={onToken(user,checkout)}
      currency='INR'
      stripeKey={STRIPE_PUBLISHABLE}
/>

export default Checkout;