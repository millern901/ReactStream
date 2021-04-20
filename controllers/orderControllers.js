const config = require('config');
const stripe = require('stripe')(config.get('StripeAPIKey'));


module.exports.checkout = async (req,res) => {
    try{
        const {source} = req.body;
        const email = user.email;
            const charge = await stripe.charges.create({
                amount: '499',
                currency: 'USD',
                source: source,
                receipt_email: email
            })
            if(!charge) throw Error('Payment failed');
        }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}
