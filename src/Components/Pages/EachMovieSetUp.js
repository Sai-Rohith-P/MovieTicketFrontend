import React from 'react'
import MovieDetailone from '../MovieDetailone.js'
import DownMoviedeatails from '../DownMoviedeatails.js'
import TextBasedFilter from '../TextBasedFilter.js'
import Upcoming from '../Upcoming.js'
import Footer from '../Footer.js'
import { Outlet } from 'react-router-dom'

function EachMovieSetUp() {
    return (
        <>
            <div style={{ backgroundColor: "rgb(234, 234, 234)", paddingBottom: "60px" }}>
                <MovieDetailone />
                <DownMoviedeatails />
                <TextBasedFilter />
                <Upcoming />
                <Footer />
                <Outlet />
            </div>
        </>
    )
}

export default EachMovieSetUp
