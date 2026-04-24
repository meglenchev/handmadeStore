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
    faFacebookF,
    faInstagram,
    faYoutube,
    faTwitter,
    faGooglePlusG,
    faPinterest
);
import { Home } from './pages/Home/Home.jsx';

function App() {
    return (
        <>
            <Home />
        </>
    );
}

export default App;
