import React, { useContext } from 'react'
import './TextBasedFilter.css'
import { NavLink } from 'react-router-dom';
import { Loginboolean } from '../App';

function TextBasedFilter() {

    const movieNames = [
        "Telugu", "Hindi", "English", "Kannada", "Tamil", "Malayalam"
    ];

    const genreNames = [
        "Action", "Comedy", "Crime", "Thriller", "Drama", "Political", "Hospitical"
    ];

    return (
        <div className='container upcoming'>
            <div className="upcominglist">
                <Top items={movieNames} title="Explore Latest Movies by Language" />
                <Top items={genreNames} title="Explore Latest Movies by Genre" />
            </div>
        </div>
    )
}

export default TextBasedFilter

export function Top({ items, title }) {
    const { ch, setCh } = useContext(Loginboolean);
    const token = localStorage.getItem("token");
    function oncha() {
        if (token) {

            setCh(true);
        } else {
            alert("Please SignUp First,Then You can Access All Routes.");
        }
    }
    return (
        <>
            <h4 className='movieslocation mt-3'>{title}</h4>
            <div className='mt-4 d-flex gap-3 lists'>
                {
                    items.map((e, index) => {
                        return (
                            <NavLink to={ch ? "/movieslist" : "#"} key={index} className="text-dark" style={{ textDecoration: "none" }} onClick={oncha}><p key={index} className='textbased'>{e}</p></NavLink>
                        )
                    })
                }
            </div>
        </>
    )
}