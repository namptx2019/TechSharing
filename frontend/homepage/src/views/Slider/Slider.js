import React, {useEffect, useState} from 'react';
import 'swiper/css/swiper.css';
import Swiper from 'react-id-swiper';
import SliderService, {SliderServiceError} from "../../services/homepage-slider.service";


const Slider = () => {
    const [SlidersList, setSlidersList] = useState([]);
    const fetchSliders = async () => {
        try {
            const response = await SliderService.get();
            setSlidersList(response.data);
            return response;
        } catch(e) {
            if(e instanceof SliderServiceError){

            }
        }
    }
    const params = {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      }

    useEffect(() => {
        fetchSliders();
    },[]);

    return(
        <div style={{marginBottom: '20px'}}>
            <section className="slider-block" v-if="this.sliders != null">
                <div className="container">
                    <div className="slider">
                        <div className="status d-none d-sm-block">
                            <div className="title">Popular Content</div>
                            <hr className="underline"/>
                        </div>
                        <Swiper {...params}>
                            {SlidersList.map(item =>
                                <div className="item">
                                    <a target="_blank">
                                        <div className="row">
                                            <div className="col-12 d-sm-none d-md-none">
                                                <div className="banner">
                                                    <div className="img" style={{backgroundSize: '100%', backgroundImage: `url(${item.thumbnail_fullpath})`}}></div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-7">
                                                <div className="content">
                                                    <h1 className="heading">{item.title}</h1>
                                                    <p className="desc">{item.desc}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-5 d-none d-sm-block">
                                                <div className="banner">
                                                    <div className="img" style={{backgroundImage: `url(${item.thumbnail_fullpath})`}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )}

                        </Swiper>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Slider;
