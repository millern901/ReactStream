import StripeCheckout from 'react-stripe-checkout';

const stripe = require('stripe')
const STRIPE_PUBLISHABLE = "pk_test_51IQJj7J37qmk2Gejn9s10LeCsuKOzN5oFpCBRROWmBCg3IkfdJVoKiF4hS0eNSpGLK6lGfbeYd5pqijMU22muHHo00e0VfqHcC";

    const pay = (req) => {
        try{    
                const {source} = req.body;
                const charge = stripe.charges.create({
                    amount: '4.99',
                    currency: 'USD',
                    source: source
                })
                if(charge){
                    console.log('Payment Success?')
                }
                if(!charge) throw Error('Payment failed');
            }
        catch(err){
            console.log(err);
            }
        }


const Checkout = ({ amount, req }) => 
    <StripeCheckout
      amount={amount*100}
      token={pay(req)}
      currency='USD'
      stripeKey={STRIPE_PUBLISHABLE}
/>

export default Checkout;