import React, { useContext } from 'react'
import './MoviesinCitiesfirst.css'
import { Inputsearch, Location } from './MoviesFilterBlock.js'

import imgonehere from '../Asserts/HomePage/theatersincity/one.avif';
import rightarrwo from '../Asserts/HomePage/MoviesFilter/right.svg';
import visit from '../Asserts/HomePage/MoviesFilter/direction.svg'
import Footer from './Footer.js';
import { NavLink } from 'react-router-dom';
import { Moviesdata } from '../App.js';

function MoviesinCitiesfirst() {

    const { theaterincity, moviesroute, setTheaterSelect } = useContext(Moviesdata);
    // console.log(theaterincity);
    // console.log(moviesroute);

    // console.log(theaterselect);

    const theaternm = moviesroute.find((movie) => movie.cityname === theaterincity.toLowerCase());
    // console.log(theaternm);

    const nm = theaternm.theaters.map((e) => e.theatername)

    return (
        <>
            <div className="container searchbar">
                <div className="seacrh">
                    <Inputsearch />
                </div>
                <div className="line"></div>
                <div className="locationw">
                    <Location />
                </div>
            </div>
            <div className="moviesincit">
                <div className=" container moviesblock">
                    <h5 className='theaternms ms-4'>Theaters In {theaterincity}</h5>
                    <div className="listsmovies">
                        <div className="cent">
                            {
                                nm.map((e) => {
                                    return (
                                        <> <TheaterslistHere name={e} func={setTheaterSelect} /></>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default MoviesinCitiesfirst


function TheaterslistHere({ name, func }) {
    return (
        <>
            <div className="onemovielists">
                <div className="imgdivhere">
                    <img src={imgonehere} alt="theaterImg" />
                </div>
                <div className="matterdivhere">
                    <h5>{name}</h5>
                    <p>Food & Beverages • Parking • +5 more</p>
                    <div className='visitbtn'>
                        <p className='visi'><img src={visit} alt="visit" /><span>Visit Here</span></p>
                        <p className='visi'><img src={visit} alt="visit" /><span>View Shows</span></p>
                    </div>
                </div>
                <div className="rightarrow">
                    <NavLink to="/movieone/theaterone" ><img src={rightarrwo} alt="rightarrow" onClick={() => { func(name) }} /></NavLink>
                </div>
            </div>
        </>
    )
}