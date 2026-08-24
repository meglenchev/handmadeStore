import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';

export function ProductsToolbar({ gridView, setGridView, productFilterView, setProductFilterView, currentSort, onSortChange, currentTag, searchParams }) {
    const buildTagHref = (tag) => {
        const params = new URLSearchParams(searchParams);
        if (tag) {
            params.set('tag', tag);
        } else {
            params.delete('tag');
        }
        const query = params.toString();
        return `/products${query ? `?${query}` : ''}`;
    };

    return (
        <div className="shop-toolbar section-fluid border-bottom">
            <div className="container">
                <div className="row">
                    {/* Isotop Filter Start */}
                    <div className="col-md col-12 align-self-center product-categories">
                        <div className="shop-product-filter">
                            <Link to={buildTagHref(null)} className={!currentTag ? 'active' : ''}>
                                Всички
                            </Link>
                            <Link to={buildTagHref('hit')} className={currentTag === 'hit' ? 'active' : ''}>
                                Горещи продукти
                            </Link>
                            <Link to={buildTagHref('new')} className={currentTag === 'new' ? 'active' : ''}>
                                Нови продукти
                            </Link>
                            <Link to={buildTagHref('sale')} className={currentTag === 'sale' ? 'active' : ''}>
                                Продукти на разпродажба
                            </Link>
                        </div>
                    </div>
                    {/* Isotop Filter End */}

                    <div className="col-md-auto col-12">
                        <ul className="shop-toolbar-controls">
                            <li>
                                <div className="product-sorting">
                                    <select className="nice-select" name="productSorting" value={currentSort} onChange={onSortChange}>
                                        <option value="menu_order">по подразбиране</option>
                                        <option value="price">цена: ниска към висока</option>
                                        <option value="price-desc">цена: висока към ниска</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="product-column-toggle d-none d-xl-flex">
                                    <button onClick={() => setGridView('grid-5')} className={`toggle hintT-top ${gridView === 'grid-5' ? 'active' : ''}`} data-hint="5 Колони">
                                        <FontAwesomeIcon icon="grip" />
                                    </button>
                                    <button onClick={() => setGridView('grid-4')} className={`toggle hintT-top ${gridView === 'grid-4' ? 'active' : ''}`} data-hint="4 Колони">
                                        <FontAwesomeIcon icon="table-cells" />
                                    </button>
                                    <button onClick={() => setGridView('grid-3')} className={`toggle hintT-top ${gridView === 'grid-3' ? 'active' : ''}`} data-hint="3 Колони">
                                        <FontAwesomeIcon icon="table-cells-large" />
                                    </button>
                                </div>
                            </li>
                            <li>
                                <button
                                    onClick={() => setProductFilterView((prev) => !prev)}
                                    className="btn btn-outline-secondary btn-product-filter"
                                    aria-expanded={productFilterView}>
                                    <FontAwesomeIcon icon="sliders" />
                                    Филтри
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
