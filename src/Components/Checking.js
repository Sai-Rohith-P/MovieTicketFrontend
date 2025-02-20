import React, { useContext, useState } from 'react'
import './Checking.css'
import card from '../Asserts/HomePage/MoviesFilter/debitcard.png';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import { Moviesdata } from '../App';
function Checking() {
    const { count } = useContext(Moviesdata);
    const [isConform, setIsConform] = useState(false);
    const [isPayment, setIsPayment] = useState(false);


    // console.log(count);
    const handleConformation = () => {
        if (!isConform) {
            alert("✅ Please Be Careful And Select the option for Booking Movie Ticket Confirmation.");
        } else {
            alert("❌ You have unchecked the confirmation option.");
        }
        setIsConform(!isConform);
    }

    const handlePayment = () => {
        if (!isPayment) {
            alert("💰 If You Click This Option, Your Amount Will Be Debited from Your Account. Is It OK?");
        } else {
            alert("❌ You have unchecked the payment confirmation option.");

        }
        setIsPayment(!isPayment);
    }

    const alertFunction = (count) => {
        alert(`Please check once! Your booked seats are: ${count.seats ? count.seats.join(", ") : "None"} and Number Of Seats is ${count.count}`);
    };

    return (
        <>
            <div className="checking mt-5">
                <h4 className='text-center conformtext'>Please Confirm Your Booking Ticket</h4>
                <img className='card' src={card} alt="debitcard" />
                <div className='ckecked'>
                    <Form.Check type="checkbox" label="Please Be Careful And Select the option for Booking Movie ticket Conformation." required onClick={handleConformation}></Form.Check>
                </div>
                <div className='ckecked'>
                    <Form.Check type="checkbox" label="If You Click This Option Your Amount Will Debit from your Account, Is It Ok ?" required onClick={handlePayment}></Form.Check>
                </div>
                <NavLink to={isConform && isPayment ? "success" : "#"}>{isConform && isPayment ? <><button className='confirmbtn' onClick={() => alertFunction(count)}>Confirm</button></> : <><button className='confirmbtn1' onClick={() => alert("We required Your Conformation.")}>Confirm</button></>}</NavLink>

            </div>
        </>
    )
}

export default Checking
