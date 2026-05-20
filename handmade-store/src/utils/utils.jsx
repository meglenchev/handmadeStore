import { NextArrow, PrevArrow } from './SliderArrows.jsx';

// Slider settings
export const settings = {
    mobileFirst: true,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};

export const settingsProductQuickView = {
    ...settings,
    dots: false,
    slidesToShow: 1,
};
