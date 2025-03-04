import React, { useEffect, useState } from 'react'
import './SuccessFul.css'
import { NavLink } from 'react-router-dom'
import logo from '../Asserts/Logo.avif';
// import backarrow from '../Asserts/HomePage/MoviesFilter/backarrow.svg';
import correct from '../Asserts/HomePage/MoviesFilter/correct.svg';
// import img from '../Asserts/HomePage/MoviesFIlterBlock/img1.avif';
import chair from '../Asserts/HomePage/MoviesFilter/chair.svg';
// import { Moviesdata } from '../App.js';
function SuccessFul() {
    // const Navigate = useNavigate();

    // const { count } = useContext(Moviesdata);
    const [count, setCount] = useState(null);

    const username = localStorage.getItem("username");

    useEffect(() => {
        const storedData = localStorage.getItem("moviedatadetails");
        if (storedData) {
            setCount(JSON.parse(storedData));
        }
    }, []);

    // console.log(count);

    useEffect(() => {

        const sendTicketData = async () => {
            if (!count) {
                return;
            }

            const body = {
                username: username,
                products: count
            }
            console.log(body);
            const headers = {
                "Content-type": "application/json"
            }

            try {
                const response = await fetch("https://movieticketbackend-tpdo.onrender.com/success", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(body)
                });
                if (!response.ok) {
                    console.error("Failed to send ticket data.");
                }
            } catch (error) {
                console.error("Error sending ticket data:", error);
            }
        }
        sendTicketData();
    }, [count, username])



    return (
        <>
            {count ? (<div className="successpage">
                <div className="toplogo">
                    <div className="container">
                        <div>
                            {/* <img onClick={() => { Navigate(-1) }} src={backarrow} className='backarrow' alt="backarrow" /> */}
                            <img className='logoimg' src={logo} alt="imglogo" />
                        </div>
                    </div>
                </div>
                <div className="msg">
                    <div className="thanksmsg">
                        <img src={correct} alt="success" />
                        <h3>Thank you for your purchase!</h3>
                    </div>
                    <div className="mainmoviedetails">
                        <div className="imgimgdiv">
                            <img src={count.movieimg} alt="movieimg" />
                        </div>
                        <div className="imgcontentdiv">
                            <h3 className='mnm'>{count.moviename}</h3>
                            <p className='data'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum accusantium ullam repudiandae!</p>
                            <h4 className='quantity'>Quantity : {count.count}</h4>
                            <div className="seatssdiv">
                                <div>
                                    <img className='chair' src={chair} alt="chair" />
                                </div>
                                <div>
                                    <h3 className='seatsnms'>Diamond : {count.seats.join(" , ")}</h3>
                                    <p className='theaternm'>Time : {count.time}</p>
                                    <p className='theaternm' style={{ marginTop: "-13px" }}>{count.theatername}</p>
                                </div>
                            </div>
                            <hr style={{ marginTop: "0px" }} />
                            <div className="pricedivtop">
                                <div className="top">
                                    <h4>Ticket Price</h4>
                                    <p>Rs.{count.price}.00</p>
                                </div>
                                <p className='tickets'>{count.count} Tickets</p>
                                <div className="divextra">
                                    <h4>Internet handling Fees</h4>
                                    <p>Rs.57.00</p>
                                </div>
                                <div className="divextra">
                                    <h4 className='fees'>Booking Fees</h4>
                                    <p>Rs.12.00</p>
                                </div>
                                <hr />
                                <div className="divextra">
                                    <h3 className='fees amountpaid' >Total Amount Paid</h3>
                                    <p className='price'>Rs.{count.price + 57 + 12}.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <NavLink to="/"><button className='goback' onClick={() => { alert("Download the Ticket or Take ScreenSort for Safe Mode.") }}>Go Back To HomePage</button></NavLink>
                </div>
            </div>) : (
                <h2>Loading...</h2> // Show this message until `count` is loaded
            )}
        </>
    )
}

export default SuccessFul
