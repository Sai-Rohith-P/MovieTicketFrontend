import React from 'react'
import './Homepage.css'
import CarouselHomepage from '../CarouselHomepage.js'
import MoviesFilterBlock from '../MoviesFilterBlock.js'
import Upcoming from '../Upcoming.js'
import TextBasedFilter from '../TextBasedFilter.js'
import Footer from '../Footer.js'

function Homepage() {

    return (
        <div className='homepage'>
            <CarouselHomepage />
            <MoviesFilterBlock />
            <Upcoming />
            <TextBasedFilter />
            <Footer />
        </div>
    )
}

export default Homepage
