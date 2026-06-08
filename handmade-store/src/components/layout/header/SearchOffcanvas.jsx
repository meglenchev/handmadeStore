import { Offcanvas } from 'react-bootstrap';
import { useForm } from '@/hooks/useForm.js';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { useQuery } from '@/hooks/useQuery.js';
import { useDebounce } from '@/hooks/useDebounce.jsx';
import Select from 'react-select';
import { customStyles } from '@/utils/customStyles.js';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const initialSearchValues = {
    name: '',
    category: 'all',
};

export function SearchOffcanvas({ activeMenu, toggleMenu }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { data } = useQuery(ENDPOINTS.PRODUCTS.ALL_CATEGORY, []);

    const formattedCategories = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.map((cat) => ({
            value: cat,
            label: cat
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
        }));
    }, [data]);

    const options = Array.isArray(formattedCategories) ? formattedCategories : [];
    const selectOptions = [{ value: 'all', label: 'Всички категории' }, ...options];
    const { inputPropertiesRegister, formValues, setFormValues } = useForm(() => {}, initialSearchValues, null);

    const submitSearch = useCallback(async (searchName, searchCategory, abortSignal) => {
        const searchWord = searchName ? searchName.trim() : '';
        const selectedCategory = searchCategory || 'all';

        if (!searchWord) {
            setProducts([]);
            return;
        }

        setIsLoading(true);

        try {
            const queryParams = new URLSearchParams({
                query: searchWord,
                category: selectedCategory,
            });

            const response = await fetch(`${BASE_URL}${ENDPOINTS.PRODUCTS.SEARCH}?${queryParams}`, {
                signal: abortSignal,
            });

            if (!response.ok) {
                throw new Error('Грешка при извличане на данните');
            }

            const data = await response.json();
            setProducts(data);
            setIsLoading(false);
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Грешка при търсене:', err.message);
                setProducts([]);
                setIsLoading(false);
            }
        }
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const debouncedSearchTerm = useDebounce(formValues.name, 1000);

    useEffect(() => {
        const controller = new AbortController();

        submitSearch(debouncedSearchTerm, formValues.category, controller.signal);

        return () => {
            controller.abort();
        };
    }, [debouncedSearchTerm, formValues.category, submitSearch]);

    const handleCloseAndClear = (menuType) => (e) => {
        setProducts([]);
        setFormValues(initialSearchValues);
        toggleMenu(menuType)(e);
    };

    return (
        <Offcanvas show={activeMenu.search} onHide={handleCloseAndClear('search')} placement="start" className="offcanvas offcanvas-search">
            <Offcanvas.Header>
                <div className="inner">
                    <div className="offcanvas-search-form">
                        <button type="button" onClick={handleCloseAndClear('search')} className="offcanvas-close">
                            ×
                        </button>
                        <form onSubmit={handleFormSubmit}>
                            <div className="row mb-n3">
                                <div className="col-lg-8 col-12 mb-3">
                                    <input type="text" {...inputPropertiesRegister('name')} placeholder="Търсене на продукти..." />
                                </div>
                                <div className="col-lg-4 col-12 mb-3">
                                    <Select
                                        options={selectOptions}
                                        styles={customStyles}
                                        defaultValue={{ value: 'all', label: 'Всички категории' }}
                                        value={selectOptions.find((opt) => opt.value === formValues.category)}
                                        onChange={(selectedOption) => {
                                            setFormValues((state) => ({ ...state, category: selectedOption.value }));
                                        }}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        placeholder="Изберете категория..."
                                    />
                                </div>
                            </div>
                            <button type="submit" style={{ display: 'none' }} aria-hidden="true" />
                        </form>
                    </div>
                    <p className="search-description text-body-light mt-2">
                        <span># Въведете поне 1 символ за търсене</span>
                        <span># Натиснете Enter за търсене или ESC за затваряне</span>
                    </p>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="inner">
                    {isLoading ? (
                        <p>Търсене...</p>
                    ) : products.length > 0 ? (
                        <ul>
                            {products.map((product) => (
                                <li key={product._id}>{product.title}</li>
                            ))}
                        </ul>
                    ) : formValues.name.trim() === '' ? (
                        <p className="text-muted">Започнете да пишете, за да намерите продукти.</p>
                    ) : (
                        <p>Няма намерени продукти.</p>
                    )}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
