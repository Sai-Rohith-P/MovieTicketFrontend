import React from 'react'

import './EachTheaters.css'
import Theatersdata from '../Theatersdata.js'
import { Outlet } from 'react-router-dom'


function EachTheaters() {
    return (
        <>
            <Theatersdata />
            <Outlet />
        </>
    )
}

export default EachTheaters
