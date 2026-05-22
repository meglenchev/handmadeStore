import Slider from 'react-slick';
import { settingsProductQuickView } from '@/utils/utils.jsx';

export function QuickViewGallery({ image, hoverImage, title }) {
    return (
        <div className="product-images">
            <div className="product-gallery-slider-quickview">
                <Slider {...settingsProductQuickView}>
                    <div className="product-zoom">
                        <img src={image} alt={title} />
                    </div>
                    <div className="product-zoom">
                        <img src={hoverImage} alt={title} />
                    </div>
                </Slider>
            </div>
        </div>
    );
}
