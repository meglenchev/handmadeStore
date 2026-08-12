import { Link } from 'react-router';
import { useEffect, useState } from 'react';
export function ProductsFilters({ categories = [], activeCategory, isOpen, onCategorySelect, onPriceCommit, maxPrice, maxLimit, onClear, searchParams }) {
    const [localPrice, setLocalPrice] = useState(maxPrice);
    useEffect(() => setLocalPrice(maxPrice), [maxPrice]);

    const buildCategoryHref = (categoryName) => {
        const params = new URLSearchParams(searchParams);
        if (!categoryName || activeCategory === categoryName) {
            params.delete('category');
        } else {
            params.set('category', categoryName);
        }
        const query = params.toString();
        return `/products${query ? `?${query}` : ''}`;
    };

    return (
        <div className={`product-filter section-fluid bg-light ${isOpen ? 'open' : 'close'}`}>
            <div className="container">
                <div className="row row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1">
                    <div className="col">
                        <h3 className="widget-title product-filter-widget-title">Категория</h3>
                        {categories && categories.length > 0 && (
                            <ul className="widget-list product-filter-widget customScroll">
                                <li className={!activeCategory ? 'active' : ''}>
                                    <Link to={buildCategoryHref(null)} onClick={() => onCategorySelect(null)}>
                                        Всички категории
                                    </Link>
                                    <span className="count">{categories.reduce((sum, c) => sum + c.count, 0)}</span>
                                </li>
                                {categories.map((category) => (
                                    <li key={category.name} className={activeCategory === category.name ? 'active' : ''}>
                                        <Link to={buildCategoryHref(category.name)} onClick={() => onCategorySelect(category.name)}>
                                            {category.name}
                                        </Link>
                                        <span className="count">{category.count}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* Categories End */}
                    <div className="col">
                        <h3 className="widget-title product-filter-widget-title">Ценови диапазон</h3>
                        <p className="learts-mb-10">
                            Цена до: <strong>{localPrice} €</strong>
                        </p>
                        <input
                            type="range"
                            min="0"
                            max={maxLimit}
                            value={localPrice}
                            onChange={(e) => setLocalPrice(Number(e.target.value))}
                            onMouseUp={() => onPriceCommit(localPrice)}
                            onTouchEnd={() => onPriceCommit(localPrice)}
                            onKeyUp={() => onPriceCommit(localPrice)}
                            style={{ width: '100%', cursor: 'pointer' }}
                        />
                    </div>
                    {/* Price filter End */}
                    <div className="col">
                        <button onClick={onClear} className="btn btn-md btn-primary2">
                            Изчисти филтрите
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
