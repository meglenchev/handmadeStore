import { useEffect, useState } from 'react';

export const useSlidesToShow = () => {
    const getSlides = () => {
        if (typeof window === 'undefined') return 4;

        const w = window.innerWidth;

        if (w < 480) return 1;
        if (w < 768) return 2;
        if (w < 1024) return 3;
        return 4;
    };

    const [slides, setSlides] = useState(getSlides());

    useEffect(() => {
        const handleResize = () => setSlides(getSlides());

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return slides;
};
