import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router';
import { HEADER_LINKS } from '@/utils/constants.js';
import { useContext } from 'react';
import ShopContext from '@/context/ShopContext.jsx';
import WishlistContext from '@/context/WishlistContext.jsx';

export function MobileMenu({ activeMenu, closeMenu }) {
    const { cartCount } = useContext(ShopContext);
    const { wishlistCount } = useContext(WishlistContext);

    return (
        <Offcanvas show={activeMenu.mobile} onHide={() => closeMenu('mobile')} placement="start" className="mobileMenu">
            <Offcanvas.Header className="head">
                <button onClick={() => closeMenu('mobile')} className="btn offcanvas-close">
                    ×
                </button>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="inner customScroll">
                    <div className="offcanvas-menu-search-form">
                        <form>
                            <input type="text" placeholder="Search..." />
                            <button>
                                <FontAwesomeIcon icon="search" />
                            </button>
                        </form>
                    </div>
                    <div className="offcanvas-menu">
                        <ul>
                            {HEADER_LINKS.map((link) => (
                                <li key={link.to}>
                                    <NavLink to={link.to} onClick={() => closeMenu('mobile')}>
                                        <span className="menu-text">{link.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="offcanvas-buttons">
                        <div className="header-tools">
                            <div className="header-login">
                                <NavLink to="/auth/login" onClick={() => closeMenu('mobile')}>
                                    <FontAwesomeIcon icon="user" />
                                </NavLink>
                            </div>
                            <div className="header-wishlist">
                                <NavLink to="/wishlist" onClick={() => closeMenu('mobile')}>
                                    {wishlistCount > 0 && <span>{wishlistCount}</span>}
                                    <FontAwesomeIcon icon="heart" />
                                </NavLink>
                            </div>
                            <div className="header-cart">
                                <NavLink to="/shopping-cart" onClick={() => closeMenu('mobile')}>
                                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                                    <FontAwesomeIcon icon="shopping-cart" />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="offcanvas-social">
                        <a href="#">
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={['fab', 'instagram']} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={['fab', 'youtube']} />
                        </a>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
