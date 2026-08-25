import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// 1. Vendor CSS
import './assets/styles/vendor/bootstrap.min.css';
import './assets/styles/vendor/themify-icons.css';
import './assets/styles/vendor/customFonts.css';

// 2. Plugins CSS
import './assets/styles/plugins/nice-select.css';

// 3. Main Style
import './assets/styles/style.css';
import { QuickViewProvider } from './context/QuickViewContext.jsx';
import { BrowserRouter } from 'react-router';
import { ShopProvider } from './context/ShopContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import AuthContext, { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StrictMode>
            <AuthProvider>
                <ShopProvider>
                    <WishlistProvider>
                        <QuickViewProvider>
                            <App />
                        </QuickViewProvider>
                    </WishlistProvider>
                </ShopProvider>
            </AuthProvider>
        </StrictMode>
    </BrowserRouter>
);
