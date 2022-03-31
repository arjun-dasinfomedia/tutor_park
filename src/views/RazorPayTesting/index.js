import axios from 'axios';
import React, { useEffect } from 'react';
// import Logo from "../../src/assets/images/logo/TutorPark_Web_logo.png";
import Logo from "../../assets/images/logo/TutorPark_Web_logo.png";

const PayByRazorPay = () => {
    const options = {
        key: 'rzp_test_jBlFauAaq9RkSM',
        amount: '50000', //  = INR 1
        name: 'Tutor Park',
        description: 'Online Learning Portal',
        image: Logo,
        handler: function(response) {
            alert(response.razorpay_payment_id);
            console.log(response);
        },
        prefill: {
            name: 'Gaurav',
            contact: '9999999999',
            email: 'demo@demo.com'
        },
        notes: {
            address: 'Razorpay Corporate Office'
        },
        theme: {
            color: '#5a55cb',
            // hide_topbar: false
        }
    };

    const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <button onClick={openPayModal}>Pay with Razorpay</button>
        </>
    );
};

export default PayByRazorPay;