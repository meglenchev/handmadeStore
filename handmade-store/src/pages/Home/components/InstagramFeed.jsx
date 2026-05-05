import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../../../utils/SliderArrows.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '../../../utils/utils.js';
import { useSlidesToShow } from '../../../hooks/useSlidesToShow.jsx';

export function InstagramFeed() {
    const settingsInsta = {
        ...settings,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToShow: useSlidesToShow(),
    };
    return (
        <div className="section section-padding border-top">
            <div className="container">
                {/* Section Title Start */}
                <div className="section-title2 text-center">
                    <h3 className="sub-title">Последвайте ни в Instagram</h3>
                    <h2 className="title">@learts_shop</h2>
                </div>
                {/* Section Title End */}
                <div className="instafeed instafeed-carousel instafeed-carousel1">
                    <Slider {...settingsInsta}>
                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src="../../assets/images/instagram/instagram-1.webp" alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}
