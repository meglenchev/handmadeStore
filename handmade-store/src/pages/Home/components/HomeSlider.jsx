import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useQuery } from '@/hooks/useQuery.js';
import { ENDPOINTS } from '@/utils/endpoints.js';
import 'swiper/css';
import 'swiper/css/pagination';

import { HOME_SLIDER_PRODUCTS } from '@/data/homeSliderProducts.js';
import { Link } from 'react-router';
import { HomeSliderSkeleton } from './HomeSliderSkeleton.jsx';
import { SectionErrorFallback } from '@/components/common/SectionErrorFallback.jsx';

export function HomeSlider() {
    const { data: products, loading, error, refresh } = useQuery(ENDPOINTS.PRODUCTS.SPECIAL, []);

    if (error) {
        return <SectionErrorFallback error={new Error(error)} title="Слайдера с продукти не зареди" resetErrorBoundary={refresh} />;
    }
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
                {loading
                    ? Array.from({ length: 1 }).map((_, index) => <HomeSliderSkeleton key={index} />)
                    : products?.map((product, index) => (
                          <SwiperSlide key={product.id} className="home-slide-item">
                              <div className="home-slide-image">
                                  <img src={product.images} alt={product.title} />
                              </div>
                              <div className="home-slide-content">
                                  <span className="sub-title">Специално за теб</span>
                                  <h2 className="title">{product.title}</h2>
                                  <div className="link">
                                      <Link to={`/product/${product.category}/${product._id}/details`}>Вземи сега</Link>
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
