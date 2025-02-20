import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
// import NavLink from 'react-bootstrap/esm/NavLink';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './Navbar.css'

import logo from '../Asserts/Logo.avif';
import { NavLink } from 'react-router-dom';
import { Loginboolean } from '../App';
import axios from 'axios';



function Navbar1() {
    let backendURL = "https://movieticketbackend-tpdo.onrender.com"
    const [personimg, setPersonalogo] = useState(true);
    const [logoimg] = useState(true);

    const loginstatus = localStorage.getItem("logined");
    // console.log(loginstatus);
    const token = localStorage.getItem("token");

    const { ch, setCh } = useContext(Loginboolean);
    function oncha() {
        if (token) {

            setCh(true);
        } else {
            alert("Please SignUp First,Then You can Access All Routes.");
        }
    }

    const username = localStorage.getItem("username");
    const [showlogout, setShowLogout] = useState(false);
    function handlingLogout() {
        setShowLogout(!showlogout);
    }
    // console.log(showlogout);

    async function logoutfunc() {
        alert("Are You Sure For LogOut Your Account?");
        setShowLogout(!showlogout);
        try {

            localStorage.removeItem("username");
            localStorage.removeItem("logined");
            await axios.post(`${backendURL}/logout`, { username });
            // console.log("Logout successful!");
        } catch (error) {
            console.error("Logout failed:", error);
        }


    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-light navbar">
                <Container>
                    <Navbar.Brand href="#home" >
                        <div className='Logo '>
                            <img src={logo} alt="" />
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto gap-3 ms-5 ul">
                            <NavLink className='Home' to={ch ? "/home" : "#"} onClick={oncha}>Home</NavLink>
                            <NavLink className='Home' to={ch ? "movies" : "#"} onClick={oncha}>Movies</NavLink>
                            <NavLink className='Home' to={ch ? "theaters" : "#"} onClick={oncha}>Theaters</NavLink>
                        </Nav>
                        <div className='loginBlock '>
                            <div className="loginBg" style={{ backgroundColor: personimg ? "rgb(0, 186, 242)" : "rgb(0, 41, 112)" }} onMouseOver={() => { setPersonalogo(false) }} onMouseOut={() => { setPersonalogo(true) }}>
                                {loginstatus ? <><span className='usernames' onClick={handlingLogout} style={{ cursor: "pointer" }}>{username}</span></> : <><h3><NavLink className='login' to="login">Login  </NavLink> {token ? <></> : <> / <NavLink className='signup' to="signup">Signup  </NavLink></>} </h3></>}
                                <div className="imgbg" style={{ backgroundColor: personimg ? "rgb(0, 41, 112)" : "rgb(0, 186, 242)" }}>
                                </div>
                                <div className='logoutblock' style={{ display: showlogout ? "block" : "none" }}>
                                    <hr style={{ width: "85%", margin: "auto" }} />
                                    <h4 className='logoutname' onClick={logoutfunc} >Logout</h4>
                                </div>
                            </div>
                            {logoimg ? <>
                                <div className="divline"></div>
                                <div className="imgbg"></div>
                            </> : <></>}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    )
}

export default Navbar1
