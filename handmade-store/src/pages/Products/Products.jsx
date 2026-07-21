import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@/hooks/useQuery.js';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { ProductSkeleton } from '../Home/components/ProductSkeleton.jsx';
import { ProductItem } from '@/components/common/ProductItem.jsx';
import { Link, useSearchParams, useLocation } from 'react-router';
import { useState } from 'react';

const GRID_VIEW_CLASSES = {
    'grid-5': 'row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1',
    'grid-4': 'row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1',
    'grid-3': 'row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1',
};

export function Products() {
    const [gridView, setGridView] = useState('grid-5');
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const currentSort = searchParams.get('sort') || 'menu_order';
    const currentTag = searchParams.get('tag');
    const { data: products, loading, error } = useQuery(ENDPOINTS.PRODUCTS.ALL(location.search), [location.search]);

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        const newParams = new URLSearchParams(searchParams);

        if (selectedSort === 'menu_order') {
            newParams.delete('sort');
        } else {
            newParams.set('sort', selectedSort);
        }

        setSearchParams(newParams);
    };

    if (error) {
        return <div className="text-center text-danger section-padding">Неуспешно зареждане: {error}</div>;
    }

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
                                    <Link to={`/products${currentSort !== 'menu_order' ? `?sort=${currentSort}` : ''}`} className={!currentTag ? 'active' : ''}>
                                        Всички
                                    </Link>
                                    <Link to={`/products?tag=hit${currentSort !== 'menu_order' ? `?sort=${currentSort}` : ''}`} className={currentTag === 'hit' ? 'active' : ''}>
                                        Горещи продукти
                                    </Link>
                                    <Link to={`/products?tag=new${currentSort !== 'menu_order' ? `?sort=${currentSort}` : ''}`} className={currentTag === 'new' ? 'active' : ''}>
                                        Нови продукти
                                    </Link>
                                    <Link to={`/products?tag=sale${currentSort !== 'menu_order' ? `?sort=${currentSort}` : ''}`} className={currentTag === 'sale' ? 'active' : ''}>
                                        Продукти на разпродажба
                                    </Link>
                                </div>
                            </div>
                            {/* Isotop Filter End */}

                            <div className="col-md-auto col-12">
                                <ul className="shop-toolbar-controls">
                                    <li>
                                        <div className="product-sorting">
                                            <select className="nice-select" value={currentSort} onChange={handleSortChange}>
                                                <option value="menu_order">по подразбиране</option>
                                                <option value="price">цена: ниска към висока</option>
                                                <option value="price-desc">цена: висока към ниска</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="product-column-toggle d-none d-xl-flex">
                                            <button
                                                onClick={() => setGridView('grid-5')}
                                                className={`toggle hintT-top ${gridView === 'grid-5' ? 'active' : ''}`}
                                                data-hint="5 Колони">
                                                <FontAwesomeIcon icon="grip" />
                                            </button>
                                            <button
                                                onClick={() => setGridView('grid-4')}
                                                className={`toggle hintT-top ${gridView === 'grid-4' ? 'active' : ''}`}
                                                data-hint="4 Колони">
                                                <FontAwesomeIcon icon="table-cells" />
                                            </button>
                                            <button
                                                onClick={() => setGridView('grid-3')}
                                                className={`toggle hintT-top ${gridView === 'grid-3' ? 'active' : ''}`}
                                                data-hint="3 Колони">
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
                        <div className={`products products-grid row ${GRID_VIEW_CLASSES[gridView]}`}>
                            {loading ? (
                                Array.from({ length: 10 }).map((_, index) => <ProductSkeleton key={index} />)
                            ) : products && products.length > 0 ? (
                                products.map((product) => {
                                    return <ProductItem key={product._id} product={product} />;
                                })
                            ) : (
                                <div className="col-12 text-center section-padding w-100">
                                    <h1 className="title">Няма налични продукти!</h1>
                                </div>
                            )}
                        </div>
                        {products && products.length > 0 && (
                            <div className="text-center learts-mt-70">
                                <a href="#" className="btn btn-dark btn-outline-hover-dark">
                                    <FontAwesomeIcon icon="plus" /> More
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
