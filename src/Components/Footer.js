import React from 'react'
import './Footer.css'

import appimg from '../Asserts/HomePage/MoviesFilter/app.png'
import phone from '../Asserts/HomePage/MoviesFilter/phone.svg'
import email from '../Asserts/HomePage/MoviesFilter/email.svg'
import linkedin from '../Asserts/HomePage/MoviesFilter/linkedin.svg'
import twitter from '../Asserts/HomePage/MoviesFilter/twitter.svg'

function Footer() {
    return (
        <div className='container footer'>
            <div className="contentfooterTop mt-3">
                <div className="div1">
                    <h2 className='downloadapp'>Download APP</h2>
                </div>
                <div className="div1 app">
                    <img src={appimg} alt="APPImg" />
                </div>
                <div className="div1 ms-auto d-flex gap-4">
                    <div className="call">
                        <img src={phone} alt="phone" />
                        <p className='text-center'>Customer Care</p>
                    </div>
                    <div className="call">
                        <img src={email} alt="phone" />
                        <p className='text-center'>Email</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footermain">
                <div className="fistfooter">
                    <h4>Browse All</h4>
                    <p>Now Showing</p>
                    <p>Coming Soon</p>
                    <p>Movies</p>
                    <p>Theaters</p>
                    <p>Location</p>
                </div>
                <div className="fistfooter">
                    <h4>Links</h4>
                    <p>SignUp</p>
                    <p>Login</p>
                    <p>Orders</p>
                    <p>Personal Portfolio</p>
                    <p>LinkedIn</p>
                </div>
                <div className="fistfooter">
                    <h4>Theaters</h4>
                    <p>Ramachandra - Anakaplli</p>
                    <p>Raja - Anakapalli</p>
                    <p>Satya - Gajuwaka</p>
                    <p>Sai ram - Visakhapatnam</p>
                    <p>Inox - Visakhapatnam</p>
                    <p>Inox - Gajuwaka</p>
                    <p>Inox - Visakhapatnam</p>
                    <p>BCA - Hyderabad</p>
                </div>
                <div className="fistfooter">
                    <p className='mt-5'>Sai ram - Visakhapatnam</p>
                    <p>Inox - Visakhapatnam</p>
                    <p>Inox - Gajuwaka</p>
                    <p>ABC - Vijayawada</p>
                    <p>BCA - Hyderabad</p>
                    <p>ABC - Vijayawada</p>
                </div>
                <div className="fistfooter">
                    <h4>Enquery</h4>
                    <p>Customer Care</p>
                    <p>6302255030</p>
                    <p>Personal Email</p>
                    <p>rohithsai4734@gmail.com</p>
                </div>
            </div>
            <hr />
            <div className="footerlast">
                <div className="socialmedia d-flex">
                    <img src={twitter} alt="" />
                    <img src={linkedin} alt="" />
                </div>
                <p className='copyright'>Copyright @ 2025 Rohith Sai. All rights reserved. Designed By Rohith Sai.</p>
            </div>
        </div>
    )
}

export default Footer
