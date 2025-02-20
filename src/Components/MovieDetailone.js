import React, { useContext } from 'react'
import './MovieDetail.css'
// import img1 from '../Asserts/HomePage/MoviesFIlterBlock/img1.avif'
import video from '../Asserts/HomePage/MoviesFilter/videoimg.svg'
import { Buttons, Location } from './MoviesFilterBlock'

import like from '../Asserts/HomePage/MoviesFilter/like.svg'
import dislike from '../Asserts/HomePage/MoviesFilter/dislike.svg'
import heartimg from '../Asserts/HomePage/MoviesFilter/heart.svg'
import { Moviesdata } from '../App.js'

function MovieDetailone() {
    const { eachdmovieata } = useContext(Moviesdata);

    // const token = localStorage.getItem("token");
    // const {ch,setCh} = useContext(Loginboolean);
    // function oncha() {
    //     if (token) {
    //         setCh(true);
    //     } else {
    //         alert("Please SignUp First,Then You can Access All Routes.");
    //     }
    // }
    const { movieimg, moviename, UA13, duration, genre, language } = eachdmovieata;

    return (
        <>
            <div className="moviedetail">
                <div className="container d-flex topdiv">
                    <div className="moviedetailtext">
                        <h4>{moviename}</h4>
                        <p>{UA13} • {duration}</p>
                        <p>{genre.map(word => word.trim().charAt(0).toUpperCase() + word.trim().slice(1)).join(" , ")}</p>
                        <p>{language.map(word => word.trim().charAt(0).toUpperCase() + word.trim().slice(1)).join(" , ")}</p>
                        <h4 className='Trailer'><span className='videologo'><img src={video} alt="trailer" /></span>Watch Trailer</h4>
                    </div>
                    <div className="moviedetailtext">
                        <img src={movieimg} alt="MovieName" />
                    </div>
                </div>
                <div className="container topdown">
                    <div>
                        <Buttons />
                    </div>
                    <div className='d-flex likediv'>
                        <div className='d-flex gap-1 mt-2'>
                            <div className='heart'>
                                <img src={heartimg} alt="heart" />
                            </div>
                            <div>
                                <p className='percentage'>90%</p>
                                <p className='liked'>Liked This Movie</p>
                            </div>
                        </div>
                        <div className='d-flex gap-2'>
                            <p className='Like'><span className='like'><img src={like} alt="Like" /></span>Like</p>
                            <p className='Like'><span className='like'><img src={dislike} alt="Like" /></span>DisLike</p>
                        </div>
                        <div className='locationdiv'>
                            <Location />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetailone
