import React, { useContext } from 'react'
import './Moviespage.css'
import { Top } from '../TextBasedFilter.js';
import Footer from '../Footer.js'
import { Moviesdata } from '../../App.js';


function Moviespage() {
    // const Hyderabad = [
    //     "Game Changer", "Pushpa", "daku Maharaj", "sankranthiki vastunnam", "Sky Force", "Emergency"
    // ];
    // const Anakapalli = [
    //     "Game Changer", "Pushpa", "Game Changer", "Pushpa", "daku Maharaj", "sankranthiki vastunnam", "Sky Force", "Emergency"
    // ];
    // const Vijayawada = [
    //     "Game Changer", "sankranthiki vastunnam", "Sky Force", "Emergency"
    // ];
    // const Gajuwaka = [
    //     "Game Changer", "Pushpa", "daku Maharaj", "daku Maharaj", "sankranthiki vastunnam", "Sky Force", "Emergency"
    // ];
    // const visakhapatnam = [
    //     "Game Changer", "Pushpa", "Sky Force", "Emergency"
    // ];


    const { moviesroute } = useContext(Moviesdata);

    return (
        <>
            <div className='container moviesList mt-5 '>
                <div className='movieslist1'>
                    <h2 className=' tittlename'>Movies</h2>
                    {/* <Top items={Hyderabad} title="Latest Movies in Hyderabead" />
                    <Top items={visakhapatnam} title="Latest Movies in Vijayawada" />
                    <Top items={Gajuwaka} title="Latest Movies in Visakhapatnam" />
                    <Top items={Vijayawada} title="Latest Movies in Gajuwaka" /> */}
                    {/* <Top items={Anakapalli} title="Latest Movies in Anakapalli" /> */}
                    {
                        moviesroute.map((city) => {
                            const { cityname, theaters } = city;
                            const moviesdata = theaters.flatMap((theater) => theater.movies);
                            const uniqueMovies = [...new Set(moviesdata)];
                            return (
                                <Top key={cityname} items={uniqueMovies} title={"Latest Movies in " + cityname.charAt(0).toUpperCase() + cityname.slice(1)} />
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Moviespage
