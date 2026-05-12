import { useEffect, useRef, useState } from 'react';

export function useSticky() {
    const [isSticky, setIsSticky] = useState(false);
    const sentinelRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: [1] }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => observer.disconnect();
    }, []);
    return { isSticky, sentinelRef };
}
