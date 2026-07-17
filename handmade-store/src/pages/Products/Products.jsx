import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Products() {
    return (
        <>
            <div className="page-title-section section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="page-title">
                                <h1 className="title">Магазин</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Title/Header End */}
            {/* Shop Products Section Start */}
            <div className="section section-padding pt-0">
                {/* Shop Toolbar Start */}
                <div className="shop-toolbar section-fluid border-bottom">
                    <div className="container">
                        <div className="row">
                            {/* Isotop Filter Start */}
                            <div className="col-md col-12 align-self-center">
                                <div className="isotope-filter shop-product-filter">
                                    <button className="active">Всички</button>
                                    <button>Горещи продукти</button>
                                    <button>Нови продукти</button>
                                    <button>Продукти на разпродажба</button>
                                </div>
                            </div>
                            {/* Isotop Filter End */}

                            <div className="col-md-auto col-12">
                                <ul className="shop-toolbar-controls">
                                    <li>
                                        <div className="product-sorting">
                                            <select className="nice-select">
                                                <option value="menu_order">по подразбиране</option>
                                                <option value="popularity">по популярност</option>
                                                <option value="rating">по средна оценка</option>
                                                <option value="date">последно добавени</option>
                                                <option value="price">цена: ниска към висока</option>
                                                <option value="price-desc">цена: висока към ниска</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="product-column-toggle d-none d-xl-flex">
                                            <button className="toggle active hintT-top" data-hint="5 Column">
                                                <FontAwesomeIcon icon="grip" />
                                            </button>
                                            <button className="toggle hintT-top" data-hint="4 Column">
                                                <FontAwesomeIcon icon="table-cells" />
                                            </button>
                                            <button className="toggle hintT-top" data-hint="3 Column">
                                                <FontAwesomeIcon icon="table-cells-large" />
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="product-filter-toggle" href="#product-filter">
                                            <FontAwesomeIcon icon="sliders" />
                                            Филтри
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Shop Toolbar End */}
                <div className="section section-fluid learts-mt-70">
                    <div className="container">
                        <div id="shop-products" className="products isotope-grid row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1"></div>
                        <div className="text-center learts-mt-70">
                            <a href="#" className="btn btn-dark btn-outline-hover-dark">
                                <FontAwesomeIcon icon="plus" /> More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
