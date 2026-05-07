import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { HOME_SLIDER_PRODUCTS } from '../../../data/homeSliderProducts.js';
import { Link } from 'react-router';

export function HomeSlider() {
    return (
        <div className="section section-fluid">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
                pagination={{
                    clickable: true,
                    el: '.home-slider-pagination',
                }}
                className="home-slider">
                {HOME_SLIDER_PRODUCTS.map((product, index) => (
                    <SwiperSlide key={product.id} className="home-slide-item">
                        <div className="home-slide-image">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className="home-slide-content">
                            <span className="sub-title">Специално за теб</span>
                            <h2 className="title">{product.title}</h2>
                            <div className="link">
                                <Link to={`/product/${product.category}/${product.id}/details`}>Вземи сега</Link>
                            </div>
                        </div>
                        <div className="home-slide-pages">
                            <span className="current">{index + 1}</span>
                            <span className="border" />
                            <span className="total">{HOME_SLIDER_PRODUCTS.length}</span>
                        </div>
                    </SwiperSlide>
                ))}

                <div className="home-slider-pagination swiper-pagination" />
            </Swiper>
        </div>
    );
}
