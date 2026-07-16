import { lazy, Suspense } from 'react';
import './utils/icons.js';
import { Header } from './components/layout/header/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { QuickView } from './components/common/QuickView.jsx';
import { Home } from './pages/Home/Home.jsx';
import { ScrollToTop } from './components/common/ScrollToTop.jsx';
import { ScrollToTopOnNavigation } from './utils/ScrollToTopOnNavigation.jsx';
import { Route, Routes } from 'react-router';

const Product = lazy(() => import('./pages/Product/Product.jsx').then((module) => ({ default: module.Product })));

function App() {
    return (
        <>
            <ScrollToTopOnNavigation />
            <Header />
            <main>
                <Suspense
                    fallback={
                        <div className="loader">
                            <h1>Зареждане...</h1>
                        </div>
                    }>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products/:productId/details" element={<Product />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
            <QuickView />
            <ScrollToTop />
        </>
    );
}

export default App;
