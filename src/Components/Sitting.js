import React, { useContext, useEffect, useState } from 'react'
import './Sitting.css'
import logo from '../Asserts/Logo.avif';
import backarrow from '../Asserts/HomePage/MoviesFilter/backarrow.svg';
import { useNavigate } from 'react-router-dom';
import { Moviesdata } from '../App.js';

import { loadStripe } from '@stripe/stripe-js';

function Sitting() {
    const Navigate = useNavigate();


    const { moviesittingone, setCount } = useContext(Moviesdata);
    // console.log(moviesittingone);
    const { count } = useContext(Moviesdata);



    useEffect(() => {
        if (count) {
            localStorage.setItem("moviedatadetails", JSON.stringify(count));
        }
    }, [count])
    console.log(count);
    // console.log(moviesittingone.data.movieimg);
    // console.log(moviesittingone);

    // const [count, setCount] = useState({});

    // console.log(count);
    const [price, setPrice] = useState(0);

    const seatStyles = {
        style1: {
            backgroundColor: "rgb(102, 212, 249)",
            color: "white"
        },
        style11: {
            backgroundColor: "rgb(150, 229, 255)",
            color: "white"
        },
        style2: {
            backgroundColor: "white",
            color: "rgb(102, 212, 249)"
        }
    }


    const [show, setShow] = useState(false);

    const [selectedCount, setSelectedCount] = useState(0);
    // console.log(selectedCount);
    useEffect(() => {
        setShow(selectedCount > 0);
    }, [selectedCount]);

    const loginstatus = localStorage.getItem("logined");

    function verufingg() {
        if (!loginstatus) {
            alert("plaese login First,Then You Can Book Tickets.")
        } else {
            alert("Thankyou For Booking Tickets.")
            makePayment()
        }
    }

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51Qy7BNJJZu6P9NK0YrmTVOyyWli403NQi8licQk2ybNhNhUlQkft3RSSWIc7JYP3SMcyrHVg8ateejFlufTWT3DF00o12zuUdd');
        if (!stripe) {
            console.error("Stripe failed to load.");
            return;
        }

        const body = {
            products: count
        }

        const headers = {
            "Content-type": "application/json"
        }

        try {
            // console.log("Sending request to backend:", body);

            const response = await fetch("https://movieticketbackend-tpdo.onrender.com/movieone/sitting/checking-session", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            const session = await response.json();
            // console.log("Received session:", session); // Debug the response

            if (!session.id) {
                // console.error("Stripe session ID is missing:", session);
                alert("Error: Payment session not created.");
                return;
            }

            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.log(result.error);
                window.location.href = "/cancel";
            }

        } catch (error) {
            console.error("Error during payment process:", error);
        }



    }

    return (
        <>
            <div className="bookingpage">
                <div className="container divtopbookinghead">
                    <div className="imgback ">
                        <img onClick={() => { Navigate(-1) }} src={backarrow} className='backarrow' alt="backarrow" />
                        <img className='logoimg' src={logo} alt="imglogo" />
                    </div>
                    <div className="movienamediv m-auto">
                        <h4>{moviesittingone.data.moviename} • Telugu</h4>
                        <p>Today, 1 Feb, {moviesittingone.time} PM at {moviesittingone.theatername}</p>
                    </div>
                </div>
                <div className="container mt-2 divbottomtopbooking">
                    <div className="timee">
                        <div className='sidetime'>
                            <p>Sat</p>
                            <h4>01 Feb</h4>
                        </div>
                        <div className="ticket">
                            <div className="ticktt">
                                <h4>{moviesittingone.time}</h4>
                                <p>2D</p>
                            </div>
                            <p className='nm'>RECLINER</p>
                        </div>
                    </div>
                    <div className="book">
                        <Booking name="Available" border="1px solid rgb(7, 186, 245)" bg="none" />
                        <Booking name="Booked" border="none" bg="rgb(194, 197, 201)" />
                        <Booking name="Selected" border="none" bg="rgb(0, 184, 245)" />
                    </div>

                </div>
            </div>
            <div className="seatsdiv">
                <div className="seats" style={{
                    height: selectedCount > 0 ? "390px" : "420px",
                    overflow: selectedCount > 0 ? "scroll" : ""
                }}>
                    <h5 className='priceslist mb-4'>PLATINUM PREMIUM RECLINER : 350</h5>
                    <div className='topdivseatsss'>
                        {
                            [...Array(7)].map((_, i) => {
                                const seatletters = ["A", "B", "C", "D", "E", "F", "G"];
                                return (
                                    <div key={i} className='topdivseats'>
                                        {i === 2 ? <h5 className='priceslist centertext mt-4 mb-5'>PLATINUM PREMIUM RECLINER : 350</h5> : <><span className='setaA me-3'>{seatletters[i]}</span>
                                            {
                                                [...Array(9)].map((_, j) => (
                                                    <Seat key={j} num={j} {...seatStyles} setSelectedCount={setSelectedCount} coutn={selectedCount} i={seatletters[i]} j={j} func={setCount} movieimg={moviesittingone.data.movieimg} mname={moviesittingone.data.moviename} tname={moviesittingone.theatername} setP={setPrice} p={price} time={moviesittingone.time} />
                                                ))
                                            }</>}

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='main' style={{ bottom: selectedCount > 0 ? "-95px" : "-40px" }}>
                    <div className="divlast">
                        <div className="screenplay">
                            <p>Screen This Way</p>
                        </div>
                    </div>

                    {show ? <><div className=' booking mt-3 '>
                        <div className="cenetr">
                            <div className='amount'>
                                {/* <h4>${selectedCount * 350}</h4> */}
                                <h4>${price}</h4>
                                <p>Ticket {selectedCount}X $350</p>
                            </div>
                            <div className='book'>
                                {/* <NavLink to={loginstatus ? "checking" : "#"} style={{ textDecoration: "none" }} onClick={verufingg}><h5>Book Ticket</h5></NavLink> */}
                                <button class='bookbutton' type={loginstatus ? "button" : "text"} onClick={() => {
                                    verufingg()

                                }} >Book Ticket</button>
                            </div>
                        </div>
                    </div></> : <></>}
                </div>
            </div >
        </>
    )
}

export default Sitting


function Seat({ style1, style11, style2, num, setSelectedCount, i, j, func, coutn, mname, tname, setP, p, time, movieimg }) {


    const [seatbg, setSeatbg] = useState(true);
    const [clicked, setClicked] = useState(false);
    // const [countseat, setCountSeat] = useState(0);
    const hanldeclick = () => {
        setClicked(!clicked);
        setSelectedCount(prev => (clicked ? prev - 1 : prev + 1));

        setP(prev => clicked ? prev - 350 : prev + 350);

        const news = i + (j + 1)

        func((prev) => ({
            ...prev,
            seats: clicked
                ? (Array.isArray(prev.seats) ? prev.seats.filter(seat => seat !== news) : []) // Remove seat if clicked
                : [...(Array.isArray(prev.seats) ? prev.seats : []), news], // Add seat if not clicked
            count: clicked ? (prev.count || 0) - 1 : (prev.count || 0) + 1,
            movieimg: movieimg,
            moviename: mname,
            theatername: tname,
            price: clicked ? p - 350 : p + 350,
            time: time
        }));

    }

    return (
        <>
            <p className='seat' style={clicked ? style1 : seatbg ? style2 : style11} onMouseOver={() => { setSeatbg(false) }} onMouseOut={() => { setSeatbg(true) }} onClick={hanldeclick} >{num + 1}</p></>
    )
}

function Booking({ name, border, bg }) {
    return (
        <>
            <div className='one'><div className='boxx' style={{ border: border, backgroundColor: bg }}></div><p className='mt-3'>{name}</p></div></>
    )
}