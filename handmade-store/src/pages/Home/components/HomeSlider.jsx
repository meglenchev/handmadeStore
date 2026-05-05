import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
                {/* Slide 1 */}
                <SwiperSlide className="home-slide-item">
                    <div className="home-slide-image">
                        <img src="/assets/images/slider/slide-1.webp" alt="Slide 1" />
                    </div>
                    <div className="home-slide-content">
                        <span className="sub-title">Специално за теб</span>
                        <h2 className="title">
                            Романтично ястие на Бъфри <br /> За Него
                        </h2>
                        <div className="link">
                            <a href="/shop">Вземи сега</a>
                        </div>
                    </div>
                    <div className="home-slide-pages">
                        <span className="current">1</span>
                        <span className="border" />
                        <span className="total">3</span>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide className="home-slide-item">
                    <div className="home-slide-image">
                        <img src="/assets/images/slider/slide-2.webp" alt="Slide 2" />
                    </div>
                    <div className="home-slide-content">
                        <span className="sub-title">Специално за теб</span>
                        <h2 className="title">
                            Държач за бижута Dorme <br /> За нея
                        </h2>
                        <div className="link">
                            <a href="/shop">Вземи сега</a>
                        </div>
                    </div>
                    <div className="home-slide-pages">
                        <span className="current">2</span>
                        <span className="border" />
                        <span className="total">3</span>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide className="home-slide-item">
                    <div className="home-slide-image">
                        <img src="/assets/images/slider/slide-3.webp" alt="Slide 3" />
                    </div>
                    <div className="home-slide-content">
                        <span className="sub-title">Специално за теб</span>
                        <h2 className="title">
                            Прясно набрани плодове <br /> За теб
                        </h2>
                        <div className="link">
                            <a href="/shop">Вземи сега</a>
                        </div>
                    </div>
                    <div className="home-slide-pages">
                        <span className="current">3</span>
                        <span className="border" />
                        <span className="total">3</span>
                    </div>
                </SwiperSlide>

                <div className="home-slider-pagination swiper-pagination" />
            </Swiper>
        </div>
    );
}
