import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '../../../utils/utils.jsx';
import { useSlidesToShow } from '../../../hooks/useSlidesToShow.jsx';

export function InstagramFeed() {
    const settingsInsta = {
        ...settings,
        slidesToShow: useSlidesToShow(),
    };

    const instaImages = ['../../assets/images/instagram/instagram-1.webp'];
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
                                <img src={instaImages[0]} alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src={instaImages[0]} alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src={instaImages[0]} alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src={instaImages[0]} alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src={instaImages[0]} alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src={instaImages[0]} alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>

                        <div className="instafeed-item-wrapper">
                            <a className="instafeed-item" href="#">
                                <img src={instaImages[0]} alt="instagram image" />
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </a>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}
