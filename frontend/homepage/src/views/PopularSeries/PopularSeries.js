import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import 'swiper/css/swiper.css';
import Swiper from 'react-id-swiper';
import SeriesItem from './SeriesItem';
import 'swiper/css/swiper.css';
import SeriesService, {SeriesServiceError} from "../../services/series.service";

const PopularSeries = () => {
    const [SeriesList, setSeriesList] = useState([]);
    const params = {
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        breakpoints: {
            1366: {
                slidesPerView: 5,
                spaceBetween: 10
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 'auto',
                spaceBetween: 10
            }
        },
        navigation: {
            nextEl: '.next',
            prevEl: '.prev'
        }
      }

    const fetchSeries = async (searchInputs = null) => {
        try {
            const response = await SeriesService.popular(searchInputs);
            setSeriesList(response.data);
            return response;
        } catch(e) {
            if(e instanceof SeriesServiceError){

            }
        }
    }

    useEffect(() => {
        fetchSeries();
    },[]);

    return(
        <section className="section-block">
            <div className="popular-series" id="homepagePopularSeries">
                <div className="container">
                    <div className="header-series">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="series-title">
                                <h2 className="title">Popular Series</h2>
                                <div className="primary left"><hr/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="body-series">
                    <div className="list-series">
                        { SeriesList.length !== 0 &&
                            <Swiper {...params}>
                                {SeriesList.map(item =>
                                    <div>
                                        <SeriesItem slug={item.slug} img={item.full_path} title={item.name} username={item.author.username} description={item.desc}/>
                                    </div>
                                )}
                                <i className="d-none prev icon-enter-tail-left"></i>
                                <i className="d-none next icon-enter-tail-right"></i>
                            </Swiper>
                        }

                    </div>
                </div>
            </div>
        </section>
    );
}

export default PopularSeries;
