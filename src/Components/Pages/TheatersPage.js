import React, { useContext } from 'react'
import { Top } from '../TextBasedFilter.js';
import Footer from '../Footer.js'
import { Moviesdata } from '../../App.js';

function TheatersPage() {
    // const Hyderabad = [
    //     "Inox", "sankranthiki vastunnam", "Sky Force", "Emergency"
    // ];
    // const Anakapalli = [
    //     "Icon", "Ramakrishna", "Sky Force", "Satya", "sankranthi", "shirdi", "Icon", "Ramakrishna", "Sky Force"
    // ];
    // const Vijayawada = [
    //     "Inox", "sankranthiki vastunnam", "Sky Force", "Emergency"
    // ];
    // const Gajuwaka = [
    //     "Icon", "Ramakrishna", "Sky Force", "Satya", "sankranthi", "shirdi", "raja"
    // ];
    // const visakhapatnam = [
    //     "Icon", "Ramakrishna", "Sky Force", "Satya"
    // ];

    const { moviesroute } = useContext(Moviesdata);
    // console.log(moviesroute);
    return (
        <>
            <div className='container moviesList mt-5 '>
                <div className='movieslist1'>
                    <h2 className=' tittlename'>Theaters</h2>
                    {/* <Top items={Hyderabad} title="Latest Movies in Hyderabead" />
                    <Top items={visakhapatnam} title="Latest Movies in Vijayawada" />
                    <Top items={Gajuwaka} title="Latest Movies in Visakhapatnam" />
                    <Top items={Vijayawada} title="Latest Movies in Gajuwaka" />
                    <Top items={Anakapalli} title="Latest Movies in Anakapalli" /> */}
                    {
                        moviesroute.map((city) => {
                            const { cityname, theaters } = city;
                            const theatersdata = theaters.flatMap((theater) => theater.theatername);
                            return (
                                <Top key={cityname} items={theatersdata} title={"Latest Movies in " + cityname.charAt(0).toUpperCase() + cityname.slice(1)} />
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TheatersPage
