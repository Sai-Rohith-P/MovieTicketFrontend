import React from 'react'
import './Canc.css'
import { NavLink } from 'react-router-dom'
import cancelledPayment from '../src/Asserts/paymentcacelled.png'

function Canc() {
    return (
        <div className="container paymentpage">
            <div className='payment'>
                <h3 className='cancel'>Payment Cancelled</h3>
                <p className='try'>Please Try Again. <span ><NavLink to="/" style={{ textDecoration: "none", fontSize: "16px" }}>Go to HomePage</NavLink></span></p>
                <hr className='m-3' />
                <img className="imgcancel" src={cancelledPayment} alt="paymentIssue" />
                <p style={{ color: "grey" }}>Ticket will be delivered After payment Sucessful.</p>
            </div>
        </div>
    )
}

export default Canc
