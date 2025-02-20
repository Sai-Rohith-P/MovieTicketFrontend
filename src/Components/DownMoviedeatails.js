import React, { useContext } from 'react'
import './DownMoviedeatails.css'
import { Inputsearch } from './MoviesFilterBlock'
import direction from '../Asserts/HomePage/MoviesFilter/direction.svg';
import info from '../Asserts/HomePage/MoviesFilter/info.svg';
import personaone from '../Asserts/HomePage/persons/allu.avif'
import { NavLink } from 'react-router-dom';
import { Moviesdata } from '../App.js';
function DownMoviedeatails() {
    const language = {
        Language: "language",
        telugu: "telugu",
        hindi: "hindi",
        tamil: "tamil"
    }
    const formate = {
        "Quality": "HD",
        "2d": "2D",
        "3d": "3D"
    }
    // const location = useLocation();

    // let sittingpath = location.pathname.includes("theaterone") ? "/movieone/theaterone/sitting" : "/movieone/sitting"

    const { eachdmovieata, theaterdetails, setTheaterSelect } = useContext(Moviesdata);
    const { setMovieSittingOne } = useContext(Moviesdata);

    // console.log(moviesittingone);

    const Alltheaters = eachdmovieata.cities.flatMap((city) => city.theaters);
    const matchedTheaters = theaterdetails.filter(theater =>
        Alltheaters.includes(theater.theatername)
    )

    const movieSchedules = matchedTheaters.map(theater => {
        const movie = theater.movies.find(m => m.moviename === eachdmovieata.moviename);
        return {
            theater: theater.theatername,
            schedule: movie ? movie.schedule : []
        };
    })

    return (
        <>
            <div className="Moviedetaildown">
                <CompleteDates language={language} formate={formate} />
                <hr style={{ marginTop: "-10px" }} />
                <div className="container moviedetails">
                    <div className="serachtheater">
                        <Inputsearch />
                    </div>
                    <hr />
                    {
                        Alltheaters.map((theater) => {
                            return (
                                <>
                                    <EachTheaters key={theater} nametheater={theater} schedule={movieSchedules} func={setTheaterSelect} nextfunc={setMovieSittingOne} prev={eachdmovieata} />
                                </>
                            )
                        })
                    }
                    <hr />
                    <div className="characterslist">
                        <h3 className='moviename'>Pushpa 2 Movie Cast</h3>
                        <div className='d-flex gap-4 mt-4' style={{ flexWrap: "wrap" }}>
                            <Persons />
                            <Persons />
                            <Persons />
                            <Persons />
                            <Persons />
                            <Persons />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function EachTheaters({ nametheater, schedule, func, nextfunc, prev }) {
    return (
        <>
            <div className="theaters" >
                <div className="theatersleft">
                    <NavLink to="/movieone/theaterone" style={{ textDecoration: "none", color: "black" }} ><h3 className='nametheater' style={{ cursor: "pointer" }} onClick={() => { func(nametheater) }}>{nametheater}</h3></NavLink>
                    <div className="d-flex gap-3 mt-3" style={{ flexWrap: "wrap" }}>
                        <Direction name="Get DIrection" img={direction} />
                        <Direction name="More Info" img={info} />
                    </div>
                    <DigitalPayments />
                </div>
                <div className="theatersright">
                    <div className="timedivv">
                        {schedule
                            .filter((eachtheater) => eachtheater.theater === nametheater)
                            .flatMap((eachtheater) =>
                                eachtheater.schedule.map((schedulers, index) => (

                                    <NavLink to="/movieone/sitting" style={{ textDecoration: "none" }} key={index}><p className="time" onClick={() => { nextfunc({ data: prev, time: schedulers, theatername: nametheater }) }}>{schedulers}</p></NavLink>
                                ))
                            )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default DownMoviedeatails


export function CompleteDates({ language, formate }) {
    return (
        <>
            <div className="container topdates pt-3 mb-3 ">
                <div className="datesdiv">
                    <p className="monthdate">FEB</p>
                    <DatesNumbers week="Sat" date="1" color="white" bg="rgb(0, 184, 245)" border="none" />
                    <DatesNumbers week="Sun" date="2" color="black" bg="white" border=" 1px solid rgba(169, 169, 169, 0.626)" />
                    <DatesNumbers week="Mon" date="3" color="black" bg="white" border=" 1px solid rgba(169, 169, 169, 0.626)" />
                </div>
                <div className="filterss d-flex">
                    <p className='filterby'>Filter By</p>
                    <Filterss options={language} />
                    <Filterss options={formate} />
                </div>
            </div>
        </>
    )
}

function Filterss({ options }) {
    return (
        <select name="options" className="options">
            {Object.entries(options).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
            ))}
        </select>
    );
}

function DatesNumbers({ week, date, color, bg, border }) {
    return (
        <><div className="datesnums" style={{ backgroundColor: bg, color: color, border: border }}>
            <p>{week}</p>
            <h5>{date}</h5>
        </div>
        </>
    )
}


export function DigitalPayments() {
    return (
        <div className='aircondition'>
            <ul>
                <li>Air Condition</li>
                <li>Digital Payments</li>
                <li>Recliners</li>
            </ul>
        </div>
    )
}

function Persons() {
    return (
        <div className='persons'>
            <img src={personaone} alt="personOne" />
            <p>Allu Arjun</p>
        </div>
    )
}

function Direction({ name, img }) {
    return (
        <div style={{ cursor: "pointer" }}>
            <p className='getdirection'><span><img className='direction' src={img} alt="direction" /></span>{name}</p>
        </div>
    )
}
