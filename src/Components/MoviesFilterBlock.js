import React, { useContext, useEffect, useState } from 'react'
import './MoviesFilterBlock.css'

import location from '../Asserts/HomePage/MoviesFilter/location.svg';
import search from '../Asserts/HomePage/MoviesFilter/search.svg';
import down from '../Asserts/HomePage/MoviesFilter/down.svg';
import up from '../Asserts/HomePage/MoviesFilter/up.svg';
// import img1 from '../Asserts/HomePage/MoviesFIlterBlock/img1.avif'

import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import { Locationcontext, Loginboolean, Moviesdata } from '../App.js';

// const Locationcontext = createContext("");
// function MoviesFilterBlock() {
//     const locationdi = useLocation();
//     const [locationdiv, setLocationdiv] = useState("");
//     const [languagediv, setlanguagediv] = useState("");
//     const [genrediv, setgenrediv] = useState("");
//     return (
//         <div className='moviesBlock'>
//             <Locationcontext.Provider value={{ locationdiv, setLocationdiv, languagediv, setlanguagediv, genrediv, setgenrediv, locationdi }}>
//                 <TopFilterrow />
//                 <FilterDiv />
//             </Locationcontext.Provider>
//         </div>
//     )
// }
function MoviesFilterBlock() {

    return (
        <div className='moviesBlock'>

            <TopFilterrow />
            <FilterDiv />

        </div>
    )
}

export default MoviesFilterBlock


function TopFilterrow() {

    return (
        <div className="topFilterRow">
            <div className="container d-flex align-items-center">
                {/* <div className='buttons'>
                    <p className='showing' style={{ backgroundColor: showing ? "white" : "" }} onClick={() => setShowing(true)}>Now Showing</p>
                    <p className='coming' style={{ backgroundColor: showing ? "" : "white" }} onClick={() => setShowing(false)}>Comming Soon</p>
                </div> */}
                <Buttons />
                <Inputsearch />
                <Location />
                {/* <div className="location ">
                    <img src={location} className='locationImg' alt="locationLogo" />
                    <select name="location" className='locationinput'>
                        <option value="Location">Location</option>
                        <option value="hyderabad">Hyderabad</option>
                        <option value="visakhapatnam">Visakhapatnam</option>
                        <option value="vijayawada">Vijayawada</option>
                        <option value="anakapalli">Anakapalli</option>
                    </select>
                </div> */}
            </div>
        </div>
    )
}
export function Inputsearch() {
    return (
        <>
            <div className="divinput d-flex" id='Search'>
                <img src={search} alt="searchLogo" />
                <input type="text" placeholder='Search Movie' />
            </div>
        </>
    )
}
export function Buttons() {
    const [showing, setShowing] = useState(true);
    return (
        <>
            <div className='buttons'>
                <p className='showing' style={{ backgroundColor: showing ? "white" : "" }} onClick={() => setShowing(true)}>Now Showing</p>
                <p className='coming' style={{ backgroundColor: showing ? "" : "white" }} onClick={() => setShowing(false)}>Comming Soon</p>
            </div>
        </>
    )
}

export function Location() {
    const { locationdiv, setLocationdiv } = useContext(Locationcontext);
    return (
        <>
            <div className="location ">
                <img src={location} className='locationImg' alt="locationLogo" />
                <select name="location" className='locationinput' value={locationdiv} onChange={(e) => { setLocationdiv(e.target.value) }}>
                    <option value="Location">Location</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="visakhapatnam">Visakhapatnam</option>
                    <option value="vijayawada">Vijayawada</option>
                    <option value="anakapalli">Anakapalli</option>
                </select>
            </div>
        </>
    )
}

export function FilterDiv() {
    const languageData = [
        {
            id: "all",
            label: "All"
        },
        {
            id: "telugu",
            label: "Telugu"
        }, {
            id: "hindi",
            label: "Hindi"
        }
        , {
            id: "tamil",
            label: "tamil"
        }, {
            id: "malayalam",
            label: "Malayalam"
        }, {
            id: "kannada",
            label: "Kannada"
        }, {
            id: "english",
            label: "English"
        }
    ]
    const GenresType = [
        {
            id: "action",
            label: "Action"
        }, {
            id: "comedy",
            label: "Comedy"
        }, {
            id: "thriller",
            label: "Thriller"
        }, {
            id: "drama",
            label: "Drama"
        }, {
            id: "political",
            label: "Political"
        }, {
            id: "historical",
            label: "Historical"
        }, {
            id: "crime",
            label: "Crime"
        }
    ]
    const [arrowup, setArroeUp] = useState(true);
    const [Genresup, setGenresup] = useState(true);
    const [viewall, setViewall] = useState(false);
    const [showfilter, setfilter] = useState(false);





    useEffect(() => {
        function checkScreenWidth() {
            setfilter(window.innerWidth >= 576);
        }
        checkScreenWidth();
        window.addEventListener("resize", checkScreenWidth);
        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, []);

    if (window.innerWidth <= 576) {
        let heightElement = document.getElementById("height");
        if (heightElement) {
            heightElement.style.height = showfilter ? "1490px" : ""
        }
    }
    const { movieslist, upcoming } = useContext(Moviesdata);
    const { locationdi } = useContext(Locationcontext);
    let Visibilitymovies = [];
    if (locationdi.pathname === "/" || locationdi.pathname === "/home") {
        Visibilitymovies = viewall ? movieslist : movieslist.slice(0, 6);
    }
    else if (locationdi.pathname === "/upcomingmovies") {
        Visibilitymovies = viewall ? upcoming : upcoming.slice(0, 6);
    }
    else {
        Visibilitymovies = viewall ? movieslist : movieslist.slice(0, 6);
    }


    // location based
    const { locationdiv } = useContext(Locationcontext);

    const { genrediv, setgenrediv } = useContext(Locationcontext);

    const { languagediv, setlanguagediv } = useContext(Locationcontext);

    const FilterMoviesbasedonlocation = Visibilitymovies.filter(movies => {
        const matchesLocation = locationdi.pathname === "/" || locationdi.pathname === "/home" ? (locationdiv === "" || locationdiv === "Location" || movies.cities.some(city => city.cityName.toLowerCase() === locationdiv.toLowerCase())) : locationdi.pathname === "/upcomingmovies" ? locationdi : (locationdiv === "" || locationdiv === "Location" ||
            movies.cities.some(city => city.cityName.toLowerCase() === locationdiv.toLowerCase()));
        ;

        const matchesLanguage = locationdi.pathname === "/" || locationdi.pathname === "/home" ?
            (languagediv === "" || languagediv === "All" ||
                movies.language.some(lang => lang.toLowerCase().includes(languagediv.toLowerCase()))) : locationdi.pathname === "/upcomingmovies" ? (languagediv === "" || languagediv === "All" ||
                    movies.language.some(lang => lang.toLowerCase().includes(languagediv.toLowerCase()))) : (languagediv === "" || languagediv === "All" ||
                        movies.language.some(lang => lang.toLowerCase().includes(languagediv.toLowerCase())));

        const matchesGenrse = locationdi.pathname === "/" || locationdi.pathname === "/home" ?
            (genrediv === "" ||
                movies.genre.some(genr => genr.toLowerCase().includes(genrediv.toLowerCase()))) : locationdi.pathname === "/upcomingmovies" ? (genrediv === "" ||
                    movies.genre.some(genr => genr.toLowerCase().includes(genrediv.toLowerCase()))) : (genrediv === "" ||
                        movies.genre.some(genr => genr.toLowerCase().includes(genrediv.toLowerCase())));



        return matchesLocation && matchesLanguage && matchesGenrse
    });

    // console.log(FilterMoviesbasedonlocation);
    const { setEachMoviesdata } = useContext(Moviesdata);
    // console.log(eachdmovieata);

    function AlertFun() {
        alert("It will Update Soon!");
    }
    return (
        <>
            <div className="container">
                <div className="filteroviesBlock" id='height'>
                    <div className="me-auto d-flex gap-2" >
                        <h5 className=' filtersmscreen' onClick={() => showfilter ? setfilter(false) : setfilter(true)}>Filters</h5>
                        <h5 className=' filtersmscreen' onClick={() => showfilter ? setfilter(false) : setfilter(true)}>Languages</h5>
                        <h5 className=' filtersmscreen' onClick={() => showfilter ? setfilter(false) : setfilter(true)}>Genres</h5>
                    </div>
                    {
                        showfilter ? <><div className="filterdiv">
                            <FilteringData name="Languages" languages={languageData} arrows={arrowup} arrowsfunc={setArroeUp} formtype="radio" landivmethod={setlanguagediv} />
                            <FilteringData name="Genres" languages={GenresType} arrows={Genresup} arrowsfunc={setGenresup} formtype="radio" landivmethod={setgenrediv} />
                            <div className='lastClear'>
                                <hr />
                                <h5 className='text-center clear'>Clear Filters</h5>
                            </div>
                        </div></> : <></>
                    }

                    <div className="moviesdiv">

                        {
                            locationdi.pathname === "/" || locationdi.pathname === "/home" ? <><h4 className='movieslocation'>Movies In {locationdiv ? locationdiv.charAt(0).toUpperCase() + locationdiv.slice(1) : "Location"}</h4></> : locationdi.pathname === "/upcomingmovies" ? <><h4 className='movieslocation'>Upcoming Movies </h4></> : <><h4 className='movieslocation'>Default Movies</h4></>
                        }

                        {/* <div className="listofmovies">
                            {
                                FilterMoviesbasedonlocation.map((e, index) => {
                                    const { moviename, UA13, language } = e;
                                    return (
                                        <><MovieOne key={index} mnname={moviename} ua={UA13} lng={language.slice(0, 3).join(" , ")} genr="" /></>
                                    )
                                })
                            }
                        </div> */}
                        <div className="listofmovies">
                            {FilterMoviesbasedonlocation.map((e, index) => {
                                const { movieimg, moviename, UA13, language } = e;

                                // Ensure values are strings
                                const formattedLanguage = Array.isArray(language)
                                    ? language.slice(0, 3).join(", ")
                                    : typeof language === "string"
                                        ? language
                                        : "";

                                const formattedUA = typeof UA13 === "string" ? UA13 : JSON.stringify(UA13);


                                return (
                                    <MovieOne
                                        key={index}
                                        movieimg={movieimg}
                                        mnname={moviename}
                                        ua={formattedUA}
                                        lng={formattedLanguage}
                                        genr=""
                                        data={e}
                                        func={locationdi.pathname === "/upcomingmovies" ? AlertFun : setEachMoviesdata}
                                        route={locationdi.pathname === "/upcomingmovies" ? "#" : "/movieone"}

                                    />
                                );
                            })}
                        </div>


                        <div className='viewalldiv' onClick={() => { viewall ? setViewall(false) : setViewall(true) }} >
                            <p className='viewAllmovies' >{viewall ? "View Less" : `View All ${FilterMoviesbasedonlocation.length} Movies`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// export function MovieOne({ mnname, lng, ua, genr }) {

//     return (
//         <>
//             <div className="oneMovie">
//                 <NavLink to="/movieone"><img src={img1} style={{ cursor: "pointer" }} alt="movielogo" /></NavLink>
//                 <div className="matter">
//                     <h5 className='moviename ps-3 mt-2'>{mnname}</h5>
//                     <div className="ps-3 d-flex gap-3 ua16">
//                         <p>{ua}</p>
//                         <sapn>{lng}</sapn>
//                         <p className="ps-3">{genr}</p>
//                     </div>
//                     <hr className='hrr' />
//                     <NavLink to="/movieone" style={{ textDecoration: "none" }}><h5 className='bookticket' style={{ cursor: "pointer" }}>Book Ticket</h5></NavLink>
//                 </div>
//             </div>
//         </>
//     )
// }
export function MovieOne({ movieimg, mnname, lng, ua, genr, data, func, route }) {
    const token = localStorage.getItem("token");
    const { ch, setCh } = useContext(Loginboolean);
    function oncha() {
        if (token) {
            setCh(true);
        } else {
            alert("Please SignUp First,Then You can Access All Routes.");
        }
    }

    return (
        <div className="oneMovie" onClick={() => { func(data) }}>
            <NavLink to={ch ? route : "#"} onClick={oncha}><img src={movieimg} style={{ cursor: "pointer" }} alt="movielogo" /></NavLink>
            <div className="matter">
                <h5 className='moviename ps-3 mt-2'>{mnname}</h5>
                <div className="ps-3 d-flex gap-3 ua16">
                    <p>{ua}</p>
                    <span>{lng}</span>
                    <p className="ps-3">{genr}</p>
                </div>
                <hr className='hrr' />
                <NavLink to={ch ? route : "#"} style={{ textDecoration: "none" }} onClick={oncha}>
                    <h5 className='bookticket' style={{ cursor: "pointer" }}>Book Ticket</h5>
                </NavLink>
            </div>
        </div>
    );
}

function FilteringData({ name, languages, arrows, arrowsfunc, formtype, landivmethod }) {

    const [selectedLanguage, setSelectedLanguage] = useState("All");
    return (
        <>
            <div className='d-flex language mt-3'>
                <h3>{name}</h3>

                {arrows ? <img src={up} onClick={() => arrowsfunc(false)} className='uparrow' alt="UpArrow" /> : <img src={down} onClick={() => arrowsfunc(true)} className='uparrow' alt="UpArrow" />}
            </div>
            {arrows ? <div className="languageslist">
                <Form>
                    {
                        languages.map((e) => {
                            const { id, label } = e;
                            return (
                                <Form.Check key={id} type={formtype} id={id} className='all' name="languages" label={label} value={label} checked={selectedLanguage.toLowerCase() === label.toLowerCase()} onChange={(event) => { setSelectedLanguage(event.target.value.toLowerCase()) }} style={{ cursor: "pointer" }} onClick={(e) => { landivmethod(e.target.value) }} />
                            )
                        })
                    }

                </Form>
            </div> : <></>}
        </>
    )
}