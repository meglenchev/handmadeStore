import { useQuery } from '@/hooks/useQuery.js';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { ProductSkeleton } from '../Home/components/ProductSkeleton.jsx';
import { ProductItem } from '@/components/common/ProductItem.jsx';
import { useSearchParams, useLocation } from 'react-router';
import { useState } from 'react';
import { SectionErrorFallback } from '@/components/common/SectionErrorFallback.jsx';
import { ProductsFilters } from './components/ProductsFilters.jsx';
import { ProductsToolbar } from './components/Products.Tolbar.jsx';

const GRID_VIEW_CLASSES = {
    'grid-5': 'row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1',
    'grid-4': 'row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1',
    'grid-3': 'row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1',
};

const MAX_LIMIT = 1000;

export function Products() {
    const [gridView, setGridView] = useState('grid-5');
    const [productFilterView, setProductFilterView] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const currentSort = searchParams.get('sort') || 'menu_order';
    const currentTag = searchParams.get('tag');

    const maxPriceParam = searchParams.get('max_price');
    const parsedMaxPrice = maxPriceParam !== null ? Number(maxPriceParam) : null;
    const maxPrice = Number.isFinite(parsedMaxPrice) && parsedMaxPrice >= 0 ? parsedMaxPrice : MAX_LIMIT;
    const activeCategory = searchParams.get('category');

    const { data: products, loading, error, refresh } = useQuery(ENDPOINTS.PRODUCTS.ALL(location.search), [location.search]);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useQuery(ENDPOINTS.PRODUCTS.ALL_CATEGORY, []);

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

    const handleCategorySelect = (category) => {
        const newParams = new URLSearchParams(searchParams);
        if (!category || activeCategory === category) {
            newParams.delete('category');
        } else {
            newParams.set('category', category);
        }
        setSearchParams(newParams);
    };

    const handlePriceCommit = (value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value < MAX_LIMIT) {
            newParams.set('max_price', value);
        } else {
            newParams.delete('max_price');
        }
        setSearchParams(newParams);
    };

    const handleClear = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('category');
        newParams.delete('max_price');
        setSearchParams(newParams);
    };

    if (error) {
        return <SectionErrorFallback error={new Error(error)} title="Продуктите не могат да се заредят" resetErrorBoundary={refresh} />;
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
                <ProductsToolbar
                    currentSort={currentSort}
                    currentTag={currentTag}
                    onSortChange={handleSortChange}
                    gridView={gridView}
                    setGridView={setGridView}
                    productFilterView={productFilterView}
                    setProductFilterView={setProductFilterView}
                    searchParams={searchParams}
                />
                {/* Shop Toolbar End */}
                <ProductsFilters
                    maxPrice={maxPrice}
                    maxLimit={MAX_LIMIT}
                    onPriceCommit={handlePriceCommit}
                    categories={categories}
                    activeCategory={activeCategory}
                    isOpen={productFilterView}
                    onCategorySelect={handleCategorySelect}
                    onClear={handleClear}
                    searchParams={searchParams}
                />
                {/* Product Filter End*/}
                <div className="section section-fluid learts-mt-70">
                    <div className="container">
                        <div className={`products products-grid row ${GRID_VIEW_CLASSES[gridView]}`}>
                            {loading ? (
                                Array.from({ length: 10 }).map((_, index) => <ProductSkeleton key={index} />)
                            ) : products && products.length > 0 ? (
                                products.map((product) => {
                                    return <ProductItem key={product._id} product={product} currentFilters={location.search} />;
                                })
                            ) : (
                                <div className="col-12 text-center section-padding w-100">
                                    <h1 className="title">Няма налични продукти!</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
