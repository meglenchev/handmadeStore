import { Offcanvas } from 'react-bootstrap';
import { NavigationLinks } from './NavigationLinks.jsx';
import { HEADER_LINKS } from '../../../utils/constants.js';

export function DesktopMenu({ activeMenu, toggleMenu }) {
    return (
        <Offcanvas show={activeMenu.desktop} onHide={toggleMenu('desktop')} placement="start" className="headerMenu offcanvas offcanvas-overlay-menu">
            <Offcanvas.Body>
                <div className="inner">
                    <button onClick={toggleMenu('desktop')} className="offcanvas-close">
                        ×
                    </button>
                    <div className="overlay-menu">
                        <NavigationLinks links={HEADER_LINKS} onItemClick={toggleMenu('desktop')} />
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
