import React, { useState } from 'react'
import './Signup.css'

import logo from '../../Asserts/Logo.avif';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function SignUpPage() {
    let backendURL = "https://movieticketbackend-tpdo.onrender.com";

    const [formData, setFormdata] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.password || !formData.email) {
            alert("Please fill the Below Form Correctly.");
            return;
        }

        try {
            const response = await axios.post(`${backendURL}/signup`, formData)
            // console.log(response.data);
            localStorage.setItem("token", response.data.token);
            setFormdata({
                name: '',
                email: '',
                phone: '',
                password: ''
            })
            navigate("/")
            alert("Successfully SignUp. Thankyou.");

            // console.log(formData)

        } catch (e) {
            alert("Signup failed. Please try again.");
        }

    }





    return (
        <>
            <div className="loginpage">
                <div className=" container topimglogin">
                    <img src={logo} alt="logo" />
                </div>
                <div className="logincenter">
                    <div className="loginForm signupform">
                        <h3 className='logtext'>Sign<span className='ms-1'>up</span></h3>
                        <p className='accountcreating d-flex'>Already Have An Account ? <Link to="/login"><span className='ms-2 creteaccount'>Login here</span></Link></p>

                        <form onSubmit={handleSubmit} action="/" method="post">
                            <div className='singleinputfield singleinputfield1'>
                                <label htmlFor="name">Username </label>
                                <input type="text" name='name' placeholder='Username' onChange={handleChange} />
                            </div>
                            <div className='singleinputfield singleinputfield1'>
                                <label htmlFor="email">Email </label>
                                <input type="email" name='email' placeholder='Email' onChange={handleChange} />
                            </div>
                            <div className='singleinputfield singleinputfield1'>
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" name='phone' placeholder='Phone Number' onChange={handleChange} />
                            </div>
                            <div className='singleinputfield singleinputfield1'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' placeholder='Password' onChange={handleChange} />
                            </div>
                            <button type="submit" className='loginbutton'>Signup</button>
                            <p className='accountcreating d-flex'>Already Have An Account ? <Link to="/login"><span className='ms-2 creteaccount'>Login Here</span></Link></p>
                        </form>

                    </div>
                </div>
                <p className='lastttext'>@2024 . All rights reserved, Designed By Rohith Sai.</p>
            </div>
        </>
    )
}

export default SignUpPage
