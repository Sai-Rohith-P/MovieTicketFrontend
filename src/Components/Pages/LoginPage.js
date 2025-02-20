import React, { useState } from 'react'
import './LoginPage.css'
import logo from '../../Asserts/Logo.avif';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Loginboolean } from '../../App.js';

function LoginPage() {
    const navigate = useNavigate();
    // const { setNm } = useContext(Loginboolean);
    // console.log(loginsetup);
    const token = localStorage.getItem("token");
    const [loginuser, setLogindata] = useState({
        phone: '',
        password: ''
    })

    let backendURL = "https://movieticketbackend-tpdo.onrender.com";
    const handleData = (e) => {
        setLogindata({ ...loginuser, [e.target.name]: e.target.value });
    }

    const handleingLogin = async (e) => {
        e.preventDefault();
        // console.log(loginuser);
        if (!loginuser.phone || !loginuser.password) {
            alert("Please fill the form Correctly.");
            return;
        }

        try {
            const response = await axios.post(`${backendURL}/login`, loginuser)
            // console.log(response.data.User);
            localStorage.setItem("username", response.data.User);

            if (response.data.status === "Success") {
                setLogindata({
                    phone: '',
                    password: ''
                })
                alert("Login Successful. Thankyou.");
                localStorage.setItem("logined", "true")
                navigate("/");
            } else if (response.data.status === "password Error") {
                alert("Password Is Not Match ,Please Check Again.");
            } else if (response.data.status === "Phone no not Found") {
                alert("Sorry, Your Phone Number is Not Signup,So Please Signup First. OR Check Your Phone Number First.");
            }
        } catch (e) {
            alert("Login failed. Please try again.");
        }
    }

    return (
        <>
            <div className="loginpage">
                <div className=" container topimglogin">
                    <img src={logo} alt="logo" />
                </div>
                <div className="logincenter">
                    <div className="loginForm">
                        <h3 className='logtext'>Log<span className='ms-1'>in</span></h3>
                        {token ? "" : <><p className='accountcreating d-flex'>Don't have Any Account ? <Link to="/signup"><span className='ms-2 creteaccount'>Create An Account</span></Link></p></>}
                        <form onSubmit={handleingLogin} action="#" method="post">
                            <div className='singleinputfield'>
                                <label htmlFor="phone">Username or Phone Number</label>
                                <input type="text" name='phone' placeholder='Phone Number' onChange={handleData} required />
                            </div>
                            <div className='singleinputfield'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' placeholder='Password' onChange={handleData} required />
                            </div>
                            <div className="checkbox mt-2">
                                <Form.Check type="checkbox" label="Keep Me Logged in" required />
                            </div>
                            <button type="submit" className='loginbutton'>Login</button>
                            <p className='mt-3 forgotpassword'>Forgot password</p>
                            {token ? "" : <><p className='accountcreating d-flex'>Don't have Any Account ? <Link to="/signup"><span className='ms-2 creteaccount'>Signup Here</span></Link></p></>}
                        </form>
                    </div>
                </div>
                <p className='lastttext'>@2024 . All rights reserved, Designed By Rohith Sai.</p>
            </div>
        </>
    )
}

export default LoginPage
