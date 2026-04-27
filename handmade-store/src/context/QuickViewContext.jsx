import { createContext, useState } from 'react';

const QuickViewContext = createContext({
    showQuickView: false,
    onOpenQuickView: () => {},
    onCloseQuickView: () => {},
});

export function QuickViewProvider({ children }) {
    // Quick View Modal state
    const [showQuickView, setShowQuickView] = useState(false);
    const [productData, setProductData] = useState(null);

    const handleCloseQuickView = () => {
        setShowQuickView(false);
        productData && setProductData(null);
    };

    const handleOpenQuickView = (productData) => {
        setProductData(productData);
        setShowQuickView(true);
    };

    return (
        <QuickViewContext.Provider value={{ showQuickView, openQuickView: handleOpenQuickView, onCloseQuickView: handleCloseQuickView, productData }}>
            {children}
        </QuickViewContext.Provider>
    );
}

export default QuickViewContext;
