import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faHeart,
    faShoppingCart,
    faSearch,
    faUser,
    faFrown,
    faRandom,
    faPlus,
    faMinus,
    faEnvelope,
    faAngleLeft,
    faAngleRight,
    faLongArrowAltUp,
    faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faYoutube, faTwitter, faGooglePlusG, faPinterest } from '@fortawesome/free-brands-svg-icons';
library.add(
    faHeart,
    faShoppingCart,
    faSearch,
    faUser,
    faFrown,
    faRandom,
    faPlus,
    faMinus,
    faEnvelope,
    faAngleLeft,
    faAngleRight,
    faLongArrowAltUp,
    faArrowUp,
    faFacebookF,
    faInstagram,
    faYoutube,
    faTwitter,
    faGooglePlusG,
    faPinterest
);
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
