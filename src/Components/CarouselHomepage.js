import React, { useRef, useEffect } from 'react'
import './CarouselHomepage.css'

import img1 from '../Asserts/HomePage/CarouselImages/img1.avif'
import img2 from '../Asserts/HomePage/CarouselImages/img2.avif'
import img3 from '../Asserts/HomePage/CarouselImages/img3.avif'
import img4 from '../Asserts/HomePage/CarouselImages/img4.avif'
import leftarrow from '../Asserts/HomePage/CarouselImages/leftarrow.svg'
import rightarrow from '../Asserts/HomePage/CarouselImages/rightarrow.svg'

function CarouselHomepage() {
    const arr = [img1, img2, img3, img4];
    const carouselRef = useRef(null);
    const itemWidth = 700;
    const totalWidth = itemWidth * arr.length;

    useEffect(() => {
        const interval = setInterval(() => {
            scrollRight();
        }, 2000);
        return () => clearInterval(interval);
    });

    const scrollLeft = () => {
        if (carouselRef.current) {
            if (carouselRef.current.scrollBy === 0) {
                carouselRef.current.scrollBy = totalWidth - itemWidth;
            } else {
                carouselRef.current.scrollBy({
                    left: -itemWidth,
                    behavior: 'smooth',
                });
            }
        }
    };
    const scrollRight = () => {
        if (carouselRef.current) {
            if (carouselRef.current.scrollLeft + itemWidth > totalWidth) {
                carouselRef.current.scrollLeft = 0;
            } else {
                carouselRef.current.scrollBy({
                    left: itemWidth,
                    behavior: 'smooth',
                });
            }
        }
    };

    return (
        <>
            <div className="carouselType">
                <div className="carousel-container">
                    <div className='arrowbg1 prev-btn' onClick={scrollLeft}>
                        <img src={leftarrow} alt="leftarrow" />
                    </div>
                    <div className="imageslist" ref={carouselRef}>
                        <img src={arr[0]} alt="Example 1" />
                        <img src={arr[1]} alt="Example 2" />
                        <img src={arr[2]} alt="Example 3" />
                        <img src={arr[3]} alt="Example 4" />
                    </div>
                    <div className='arrowbg1 next-btn' onClick={scrollRight}>
                        <img src={rightarrow} alt="rightarrow" />
                    </div>
                </div>
            </div>
        </>
    );
}


export default CarouselHomepage
