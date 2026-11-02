import { useEffect, useState } from 'react';

export function useProductQuantity(productData, inCartQuantity = 0, onMaxReached) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setQuantity(1);
    }, [productData?._id]);

    const stock = productData?.stock ?? 0;
    const maxToAdd = Math.max(stock - inCartQuantity, 0);

    const handleMinus = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handlePlus = () => {
        if (quantity < maxToAdd) {
            setQuantity((prev) => prev + 1);
            return;
        }

        onMaxReached?.(
            inCartQuantity > 0
                ? `В количката вече имате ${inCartQuantity} бр. Налични са общо ${stock} бр.`
                : `Достигнахте максималното налично количество на склад (${stock} бр.)`,
            'warning',
        );
    };

    return { quantity, setQuantity, handleMinus, handlePlus };
}
