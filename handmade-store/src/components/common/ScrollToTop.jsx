import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = throttle(() => {
            setIsVisible(window.scrollY > 300);
        }, 200);

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        isVisible && (
            <button onClick={scrollToTop} id="scrollUp">
                <FontAwesomeIcon icon="arrow-up" />
            </button>
        )
    );
}
