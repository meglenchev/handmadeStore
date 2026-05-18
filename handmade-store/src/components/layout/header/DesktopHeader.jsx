import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';

export function DesktopHeader({ isSticky, toggleMenu, wishlistCount, cartCount, activeMenu }) {
    return (
        <header className={`header-section header-menu-center section bg-white d-none d-xl-block ${isSticky ? 'sticky-header is-sticky' : 'py-3'}`}>
            <div className="container">
                <div className="row align-items-center">
                    {/* Header Menu Toggle Start */}
                    <div className="col">
                        <div className="header-tools">
                            <div className="mobile-menu-toggle">
                                <button onClick={toggleMenu('desktop')} className="offcanvas-toggle">
                                    <svg viewBox="0 0 800 600">
                                        <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="top" />
                                        <path d="M300,320 L540,320" className="middle" />
                                        <path
                                            d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                                            className="bottom"
                                            transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Header Menu Toggle End */}
                    {/* Header Logo Start */}
                    <div className="col">
                        <div className="header-logo d-flex justify-content-center">
                            <Link to="/">
                                <img src="../../assets/images/logo/logo-2.webp" alt="Learts Logo" />
                            </Link>
                        </div>
                    </div>
                    {/* Header Logo End */}
                    {/* Header Tools Start */}
                    <div className="col">
                        <div className="header-tools justify-content-end">
                            <div className="header-login">
                                <Link to="/my-account">
                                    <FontAwesomeIcon icon="user" />
                                </Link>
                            </div>
                            <div className="header-search d-none d-sm-block">
                                <button onClick={toggleMenu('search')} className="offcanvas-toggle">
                                    <FontAwesomeIcon icon="search" />
                                </button>
                            </div>
                            <div className="header-wishlist">
                                <button onClick={toggleMenu('wishlist')} className={`offcanvas-toggle ${activeMenu.wishlist ? 'close' : ''}`}>
                                    {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
                                    <FontAwesomeIcon icon="heart" />
                                </button>
                            </div>
                            <div className="header-cart">
                                <button onClick={toggleMenu('cart')} className="offcanvas-toggle">
                                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                                    <FontAwesomeIcon icon="shopping-cart" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Header Tools End */}
                </div>
            </div>
        </header>
    );
}
