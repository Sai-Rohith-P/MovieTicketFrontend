import React, { useContext, useEffect, useState } from 'react'
import './Theatersdata.css'
import direction from '../Asserts/HomePage/MoviesFilter/direction.svg'
import { CompleteDates, DigitalPayments } from './DownMoviedeatails.js'
import heart from '../Asserts/HomePage/MoviesFilter/heart.svg'
import { Inputsearch } from './MoviesFilterBlock.js'
// import img1 from '../Asserts/HomePage/MoviesFIlterBlock/img1.avif'
import { Top } from './TextBasedFilter.js'
import Upcoming from './Upcoming.js'
import Footer from './Footer.js'
import { NavLink } from 'react-router-dom'
import { Moviesdata } from '../App.js'
function Theatersdata() {
    const cityNames = [
        "Hyderabad", "Vijayawada", "Visakhapatnam", "Anakapalli", "Gajuwaka"
    ];
    const theatersUnderNames = [
        "Eylex Cinema, Modipada, Sambalpur"
    ];
    const movieNames = [
        "Telugu", "Hindi", "English", "Kannada", "Tamil", "Malayalam"
    ];

    const genreNames = [
        "Action", "Comedy", "Crime", "Thriller", "Drama", "Political", "Hospitical"
    ];
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

    const { theaterselect, moviesroute, movieslist, theaterdetails } = useContext(Moviesdata);
    const [moviesda, setMoviesDa] = useState([]);
    useEffect(() => {
        if (!theaterselect) return;

        const selectedMovies = moviesroute
            .flatMap((city) => city.theaters)
            .filter((theater) => theater.theatername === theaterselect)
            .flatMap((theater) => theater.movies.map((moviename) => ({ moviename })));

        setMoviesDa(selectedMovies);
    }, [theaterselect, moviesroute]);

    // console.log(movieslist); // all data
    // console.log(moviesroute); // movies names
    // console.log(moviesda); // movies new addedd dat);


    // console.log(moviesda);  this is for accessing data movie name name from what user clicking...


    const movielistfilters = movieslist.filter((movies) => moviesda.some((m) => m.moviename === movies.moviename))
        .map((movie) => ({
            movieimg: movie.movieimg,
            moviename: movie.moviename,
            genre: movie.genre,
            language: movie.language,
            UA13: movie.UA13,
        }))

    // console.log(movielistfilters);  this is filter data from teo data based and then gather data like above
    const newFilterMoviesdata = movielistfilters.map((movie) => {
        const theaterdetails1 = theaterdetails.flatMap((theater) => theater.movies)
            .find((theatermovie) => theatermovie.moviename === movie.moviename)

        return {
            ...movie,
            schedule: theaterdetails1 ? theaterdetails1.schedule : []
        }
    })
    // console.log(newFilterMoviesdata );  this is access scedulers from diffetent database and filter this.

    const { setEachMoviesdata } = useContext(Moviesdata);
    // console.log(eachdmovieata);
    // console.log(movieslist);
    // console.log(newFilterMoviesdata);

    const [newmovingdata, setNewMovingdata] = useState({});
    const movingData = movieslist.find((movie) => movie.moviename === newmovingdata.moviename)
    // console.log(movingData);
    // console.log(newmovingdata);
    setEachMoviesdata(movingData);
    // console.log(movingData);
    // console.log(newmovingdata);

    const { setMovieSittingOne, setTheaterInCity } = useContext(Moviesdata);
    // console.log(moviesittingone); // data:{} details not recived



    return (
        <>
            <div className='container theatersList'>
                <div className="theatersListdiv">
                    <div className='d-flex gap-2 heartdiv'>
                        <h4 className='thearetrname'>{theaterselect}</h4>
                        <img className='heart' src={heart} alt="heart" />
                    </div>
                    <p className='theateraddress'>City Centre Mall, Farm Road, Modipada, Sambalpur, Odisha 768002, India</p>
                    <DigitalPayments />
                </div>
                <div className="directiondiv">
                    <h4><span><img className='directionn' src={direction} alt="direction" /></span>Get Direction</h4>
                </div>
            </div>
            <div className="moviess">
                <div className="topdates">
                    <CompleteDates language={language} formate={formate} />
                </div>
                <div className="container moviedetails">
                    <div className="serachtheater">
                        <Inputsearch />
                    </div>
                    {
                        newFilterMoviesdata.map((e, index) => {
                            return (
                                <>
                                    <hr />
                                    <MoviesList key={index} movieimg={e.movieimg} moviename={e.moviename} genre={e.genre} language={e.language} schedule={e.schedule} ua13={e.UA13} data={e} func={setNewMovingdata} nextFunc={setMovieSittingOne} theater={theaterselect} movieslist={movieslist}
                                    />
                                    {/* nextfunc={setMovieSittingOne} prev={eachdmovieata}  */}

                                </>

                            )
                        })
                    }
                </div>
                <div className="container mt-5 p-4 upcominglist">
                    <Topcities items={cityNames} title="Cinema Halls & Theatres in Top Cities" func={setTheaterInCity} />
                    <Top items={theatersUnderNames} title="Theatres Under Same Cinema Chain" />
                </div>
                <div className="mt-5">
                    <Upcoming />
                </div>
                <div className="container p-4 mb-5 upcominglist">
                    <div className='mb-3'>
                        <h4 className='latestMovies mb-2'>Latest Movies to Book in Sambalpur</h4>
                        <p className='movienameslistt'><span className='movienms'>Deva</span> | <span className='movienms'>Sky Force</span> | <span className='movienms'>Angel (2025)</span> | <span className='movienms'>Pushpa 2: The Rule</span> | <span className='movienms'>Emergency</span></p>
                    </div>
                    <Top items={movieNames} title="Explore Latest Movies in Sambalpur by Language" />
                    <Top items={genreNames} title="Explore Latest Movies in Sambalpur by Genre" />

                </div>
                <div style={{ marginTop: "60px" }}>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Theatersdata

function MoviesList({ movieimg, moviename, genre, language, schedule, ua13, data, func, nextFunc, theater, movieslist }) {
    // const handleClick = (data, newdata) => {
    //     func(data);
    //     changemain(newdata);
    //     console.log(newdata);
    // };
    const handleClick = async (data, func) => {
        await func(data);
        // changemain(newdata) // showing Undefiend while acceessing new data if exisiting data is there ?
    };

    const handlingFunction = async (nextFunc, moviename, time, theatername, movieslist) => {
        const matchedmoviename = movieslist.find((movie) => movie.moviename === moviename);

        if (matchedmoviename) {
            // await access({ moviename });
            await nextFunc({ data: matchedmoviename, time, theatername });
        }
    }
    return (
        <>
            <div className="movi">
                <div className="movileft d-flex gap-2" onClick={() => handleClick(data, func)} >
                    <div className="imgvid">
                        <NavLink to="/movieone"> <img className='img11' src={movieimg} alt="pushap" /></NavLink>
                    </div>
                    <div className="imgtext ps-2">
                        <NavLink to="/movieone" style={{ textDecoration: "none" }}><h5 className='text-dark'>{moviename}</h5></NavLink>
                        <p className='mt-3'>• <span>{genre.slice(0, 3).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" , ")}</span></p>
                        <p className='ps-2'>{ua13}</p>
                    </div>
                </div>
                <div className="moviright">
                    <h4 className='language'>{language.slice(0, 3).map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1)).join(" , ")}</h4>
                    <div className="timedivv">
                        {
                            schedule.map((e) => {
                                return (
                                    <><NavLink to="/movieone/sitting" style={{ textDecoration: "none" }} ><p className='time' onClick={() => { handlingFunction(nextFunc, moviename, e, theater, movieslist) }}>{e}</p></NavLink></>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}



function Topcities({ items, title, func }) {
    return (
        <>
            <h4 className='movieslocation mt-3'>{title}</h4>
            <div className='mt-4 d-flex gap-3 lists'>
                {
                    items.map((e, index) => {
                        return (
                            <NavLink to="/moviesincities" className="text-dark" style={{ textDecoration: "none" }} key={index}><p key={index} className='textbased' onClick={() => { func(e) }} >{e}</p></NavLink>
                        )
                    })
                }
            </div>
        </>
    )
}