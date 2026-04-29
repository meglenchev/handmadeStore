// Slider settings
export const settings = {
    mobileFirst: true,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        { breakpoint: 480, settings: { slidesToShow: 1 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 1280, settings: { slidesToShow: 4 } },
    ],
};
