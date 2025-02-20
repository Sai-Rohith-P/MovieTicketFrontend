import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar1 from './Components/Navbar1.js';
import Homepage from './Components/Pages/Homepage.js'
import Moviespage from './Components/Pages/Moviespage.js'
import TheatersPage from './Components/Pages/TheatersPage.js'
import SignUpPage from './Components/Pages/SignUpPage.js';
import LoginPage from './Components/Pages/LoginPage.js';
import FilterMovieList from './Components/Pages/FilterMovieList.js';
import EachMovieSetUp from './Components/Pages/EachMovieSetUp.js';
import EachTheaters from './Components/Pages/EachTheaters.js';
import SittingArrangeMent from './Components/Pages/SittingArrangeMent.js';
import MoviesInCities from './Components/Pages/MoviesInCities.js';
import CheckingBook from './Components/Pages/CheckingBook.js';
import SucessPage from './Components/Pages/SucessPage.js';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios'



export const Moviesdata = createContext();
export const Locationcontext = createContext("");
export const Loginboolean = createContext("");
function App() {
  const location = useLocation();

  const hiddenpath = ["/movieone/theaterone/sitting", "/movieone/sitting", "/login", "/signup", "/movieone/sitting/checking", "/movieone/theaterone/sitting/checking", "/movieone/theaterone/sitting/checking/success", "/movieone/sitting/checking/success"];


  const [movieslist, setMoviesList] = useState([]);
  const [upcomingmovieslist, setupcomingmovieslist] = useState([]);
  const [moviesroute, setmoviesRoute] = useState([]);

  // Acceessing each data 
  const [eachdmovieata, setEachMoviesdata] = useState({});

  // Accesing movies in sitting page
  const [moviesittingone, setMovieSittingOne] = useState({});


  // backend URL
  let backendURL = "https://movieticketbackend-tpdo.onrender.com";
  // Default data
  useEffect(() => {
    axios.get(backendURL)
      .then((data) => {
        setMoviesList(data.data.mainmoviesdata);
        setupcomingmovieslist(data.data.upcomingdata);
      })
      .catch((err) => { console.log("Error ", err); });
  }, [backendURL])

  // Upcomingpage data
  const [upcoming, setUpcoming] = useState([]);
  useEffect(() => {
    axios.get(`${backendURL}/upcomingmovies`)
      .then((data) => {
        setUpcoming(data.data);
      })
      .catch((err) => { console.log("Error ", err); })
  }, [backendURL])

  // Movies and theaters data
  useEffect(() => {
    axios.get(`${backendURL}/theaters`)
      .then((data) => {
        setmoviesRoute(data.data);
      })
      .catch((err) => {
        console.log("Error ", err);
      })
  }, [backendURL])


  const [theaterdetails, setTheaterDetails] = useState([]);
  useEffect(() => {
    axios.get(`${backendURL}/movieone`)
      .then((theaters) => {
        setTheaterDetails(theaters.data);

      })
      .catch((err) => {
        console.log("error ", err);
      })
  }, [backendURL])

  // movieslist page
  const locationdi = useLocation();
  const [locationdiv, setLocationdiv] = useState("");
  const [languagediv, setlanguagediv] = useState("");
  const [genrediv, setgenrediv] = useState("");

  //selecting seats for bookking
  const [count, setCount] = useState({});

  // Each Theater Selects 
  const [theaterselect, setTheaterSelect] = useState({});

  const [theaterincity, setTheaterInCity] = useState("");


  // const [loginsetup, setLoginSetUp] = useState(false);


  // Access the token
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage!");
  } else {
    axios.get(`${backendURL}/movies`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    // .then((e) => console.log(e))
    // .catch((err) => console.log(err))
  }


  const [ch, setCh] = useState(false);

  //Accessing user name
  // const [nm, setNm] = useState("");
  return (
    <>
      <Loginboolean.Provider value={{ ch, setCh }}>
        {!hiddenpath.includes(location.pathname) && <Navbar1 />}

        {/* <Moviesdata.Provider value={{ movieslist, upcomingmovieslist }}> */}

        <Locationcontext.Provider value={{ locationdiv, setLocationdiv, languagediv, setlanguagediv, genrediv, setgenrediv, locationdi }}>
          <Moviesdata.Provider value={{ movieslist, upcomingmovieslist, upcoming, moviesroute, eachdmovieata, setEachMoviesdata, theaterdetails, setTheaterDetails, theaterselect, setTheaterSelect, moviesittingone, setMovieSittingOne, count, setCount, setTheaterInCity, theaterincity }}>
            <Routes >
              <Route path='/' element={<Homepage />} >
                <Route path='home' element={<Homepage />} />
                <Route path='upcomingmovies' element={<Homepage />} />

              </Route>
              <Route path='/movieslist' element={<FilterMovieList />} />
              <Route path='/home/movieslist' element={<FilterMovieList />} />

              <Route path='/movies' element={<Moviespage />} />
              <Route path='/theaters' element={<TheatersPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/moviesincities' element={<MoviesInCities />} />

              <Route path="/movieone" element={<EachMovieSetUp />} />
              <Route path="/movieone/theaterone" element={<EachTheaters />} />
              <Route path="/movieone/sitting" element={<SittingArrangeMent />} />
              <Route path="/movieone/theaterone/sitting" element={<SittingArrangeMent />} />
              <Route path="/movieone/sitting/checking" element={<CheckingBook />} />
              <Route path="/movieone/theaterone/sitting/checking" element={<CheckingBook />} />
              <Route path="/movieone/sitting/checking/success" element={<SucessPage />} />
              <Route path="/movieone/theaterone/sitting/checking/success" element={<SucessPage />} />
            </Routes>
          </Moviesdata.Provider>
        </Locationcontext.Provider>
      </Loginboolean.Provider>
    </>
  );
}

export default App;
