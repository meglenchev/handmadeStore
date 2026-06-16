import Slider from 'react-slick';
import { settingsProductQuickView } from '@/utils/utils.jsx';

export function ProductGallery({ images, title }) {
    const hasImages = images && images.length > 0;
    return (
        <div className="product-images">
            <div className="product-gallery-slider-quickview">
                {hasImages ? (
                    <Slider {...settingsProductQuickView}>
                        {images.map((image, i) => (
                            <div className="product-zoom" key={i}>
                                <img src={image} alt={title} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="skeleton-blur" style={{ width: '100%', height: '760px' }}></div>
                )}
            </div>
        </div>
    );
}
