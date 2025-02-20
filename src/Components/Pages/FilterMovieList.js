import React from 'react'
import { FilterDiv } from '../MoviesFilterBlock.js'
import Footer from '../Footer'
import './FilterMoviesList.css'

function FilterMovieList() {
    return (
        <>
            <div className="moviesBlock filterroute" style={{ marginTop: "-26px" }}>
                <FilterDiv />
                <Footer />
            </div>
        </>
    )
}

export default FilterMovieList
