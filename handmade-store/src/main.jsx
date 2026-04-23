import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// 1. Vendor CSS
import './assets/styles/vendor/bootstrap.min.css';
import './assets/styles/vendor/themify-icons.css';
import './assets/styles/vendor/customFonts.css';

// 2. Plugins CSS
import './assets/styles/plugins/select2.min.css';
import './assets/styles/plugins/perfect-scrollbar.css';
import './assets/styles/plugins/nice-select.css';
import './assets/styles/plugins/ion.rangeSlider.min.css';
import './assets/styles/plugins/photoswipe.css';
import './assets/styles/plugins/photoswipe-default-skin.css';
import './assets/styles/plugins/magnific-popup.css';

// 3. Main Style
import './assets/styles/style.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
