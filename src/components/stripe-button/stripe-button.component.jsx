import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100 ;
    const publishableKey = 'pk_test_51Ivw0BSGSTvjGANXQPKHIRowUSRq2fgdf5a6KpxlNeOY3geBZqpswaJIyHtytEW0M1Pt4z5Kt9LVnvzEeELA805y00KAxdcZMP';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now' 
            name='Eshopee Stores' 
            billingAddress=''
            shippingAddress='' 
            description={`Your Total is $${price}`}
            amount={priceForStripe} 
            panelLabel='Pay Now' 
            token={onToken} 
            stripeKey={publishableKey}/>
    );
};

export default StripeCheckoutButton;