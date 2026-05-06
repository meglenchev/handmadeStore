import './utils/icons.js';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { QuickView } from './components/common/QuickView.jsx';
import { Home } from './pages/Home/Home.jsx';
import { ScrollToTop } from './components/common/ScrollToTop.jsx';

function App() {
    return (
        <>
            <Header />
            <Home />
            <Footer />
            <QuickView />
            <ScrollToTop />
        </>
    );
}

export default App;
