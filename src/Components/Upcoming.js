import React, { useContext } from 'react'
import './Upcoming.css'
import { MovieOne } from './MoviesFilterBlock'
import { NavLink, useLocation } from 'react-router-dom'
import { Loginboolean, Moviesdata } from '../App.js';

function Upcoming() {
    const { upcomingmovieslist } = useContext(Moviesdata);
    const locationdi = useLocation();
    const { movieslist } = useContext(Moviesdata);
    let randomnum = movieslist.sort(() => Math.random() - 0.5).slice(0, 4);

    const { ch, setCh } = useContext(Loginboolean);
    const token = localStorage.getItem("token");
    function oncha() {
        if (token) {

            setCh(true);
        } else {
            alert("Please SignUp First,Then You can Access All Routes.");
        }
    }


    function AlertFun() {
        alert("It will Update Soon!");
    }
    function ClickAll() {
        alert("Please click all movies button");
    }
    return (
        <div className='container upcoming'>
            <div className="upcominglist">
                <div className='d-flex'>
                    <h4 className='movieslocation'>{locationdi.pathname === "/" || locationdi.pathname === "/home" ? "Upcoming Movies" : locationdi.pathname === "/upcomingmovies" ? "Favourite Movie" : "Upcoming Movies"}</h4>

                    {locationdi.pathname === "/" || locationdi.pathname === "/home" ? <><NavLink to={ch ? "/upcomingmovies" : "#"} className="ms-auto" style={{ textDecoration: "none" }} onClick={oncha}><p className=' viewall'>View All</p></NavLink></> : locationdi.pathname === "/upcomingmovies" ? <><NavLink to="/home" className="ms-auto" style={{ textDecoration: "none" }}><p className=' viewall'>View All</p></NavLink></> : <><NavLink to="/upcomingmovies" className="ms-auto" style={{ textDecoration: "none" }}><p className=' viewall'>View All</p></NavLink></>}

                </div>
                <div className="movieslistupcoming">
                    {locationdi.pathname === "/" || locationdi.pathname === "/home" ? <>{
                        upcomingmovieslist.map((e, index) => {
                            const { movieimg, moviename, UA13, language, genre } = e;
                            return (
                                <><MovieOne key={index} movieimg={movieimg} mnname={moviename} ua={UA13} lng={language.join(" , ")} genr={genre.slice(0, 1).join(",")} func={ch ? AlertFun : oncha} route="#" /></>
                            )
                        })
                    }</> : locationdi.pathname === "/upcomingmovies" ? <>{
                        randomnum.map((e, index) => {
                            const { movieimg, moviename, UA13, language, genre } = e;
                            return (
                                <><MovieOne key={index} movieimg={movieimg} mnname={moviename} ua={UA13} lng={language.slice(0, 2).join(" , ")} genr={genre.slice(0, 1).join(",")} func={ClickAll} route="#" /></>
                            )
                        })
                    }</> : upcomingmovieslist.map((e, index) => {
                        const { movieimg, moviename, UA13, language, genre } = e;
                        return (
                            <><MovieOne key={index} movieimg={movieimg} mnname={moviename} ua={UA13} lng={language.join(" , ")} genr={genre.slice(0, 1).join(",")} route="#" func={AlertFun} /></>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Upcoming
