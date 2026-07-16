import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './utils/icons.js';
import { Header } from './components/layout/header/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { QuickView } from './components/common/QuickView.jsx';
import { Home } from './pages/Home/Home.jsx';
import { ScrollToTop } from './components/common/ScrollToTop.jsx';
import { ScrollToTopOnNavigation } from './utils/ScrollToTopOnNavigation.jsx';
import { Route, Routes } from 'react-router';

const Product = lazy(() => import('./pages/Product/Product.jsx').then((module) => ({ default: module.Product })));

function ErrorFallback({ resetErrorBoundary }) {
    return (
        <div className="section">
            <div className="container">
                <div className="content-404 text-center error-container">
                    <h1 className="title">Нещо се обърка</h1>
                    <p className="learts-mb-30">Възникна неочаквана грешка. Моля, опитайте отново.</p>
                    <button onClick={resetErrorBoundary} className="btn btn-danger">
                        Опитай отново
                    </button>
                </div>
            </div>
        </div>
    );
}

function logError(error, info) {
    console.error('ErrorBoundary caught an error:', error, info.componentStack);
}

function App() {
    return (
        <>
            <ScrollToTopOnNavigation />
            <Header />
            <main>
                <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError} onReset={() => window.location.reload()}>
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
                </ErrorBoundary>
            </main>
            <Footer />
            <QuickView />
            <ScrollToTop />
        </>
    );
}

export default App;
