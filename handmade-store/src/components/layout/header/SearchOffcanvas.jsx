import { Offcanvas } from 'react-bootstrap';

export function SearchOffcanvas({ activeMenu, toggleMenu }) {
    return (
        <Offcanvas show={activeMenu.search} onHide={toggleMenu('search')} placement="start" className="offcanvas offcanvas-search">
            <Offcanvas.Body>
                <div className="inner">
                    <div className="offcanvas-search-form">
                        <button onClick={toggleMenu('search')} className="offcanvas-close">
                            ×
                        </button>
                        <form action="#">
                            <div className="row mb-n3">
                                <div className="col-lg-8 col-12 mb-3">
                                    <input type="text" placeholder="Търсене на продукти..." />
                                </div>
                                <div className="col-lg-4 col-12 mb-3">
                                    <select className="search-select select2-basic">
                                        <option value={0}>Всички категории</option>
                                        <option value="kids-babies">Kids &amp; Babies</option>
                                        <option value="home-decor">Home Decor</option>
                                        <option value="gift-ideas">Gift ideas</option>
                                        <option value="kitchen">Kitchen</option>
                                        <option value="toys">Toys</option>
                                        <option value="kniting-sewing">Kniting &amp; Sewing</option>
                                        <option value="pots">Pots</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <p className="search-description text-body-light mt-2">
                        <span># Въведете поне 1 символ за търсене</span>
                        <span># Натиснете Enter за търсене или ESC за затваряне</span>
                    </p>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
