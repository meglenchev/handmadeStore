import { Offcanvas } from 'react-bootstrap';
import { useForm } from '@/hooks/useForm.js';
import { useMemo, useState } from 'react';
import { ENDPOINTS } from '@/utils/endpoints.js';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import { useQuery } from '@/hooks/useQuery.js';

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

    function validate(values) {
        let newErrors = {};
        if (!values.name?.trim()) {
            newErrors.name = 'Полето е задължително!';
        }
        return newErrors;
    }

    const submitSearch = async (formValues) => {
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}${ENDPOINTS.PRODUCTS.SEARCH}?query=${formValues.name}&category=${formValues.category}`);

            if (!response.ok) {
                throw new Error('Грешка при извличане на данните');
            }

            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error(err.message);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const { formAction, inputPropertiesRegister, formErrors, setFormValues, setFormErrors } = useForm(submitSearch, initialSearchValues, validate);

    const handleCloseAndClear = (menuType) => (e) => {
        setProducts([]);
        setFormValues(initialSearchValues);

        if (typeof setFormErrors === 'function') {
            setFormErrors({});
        }

        toggleMenu(menuType)(e);
    };

    return (
        <Offcanvas show={activeMenu.search} onHide={handleCloseAndClear('search')} placement="start" className="offcanvas offcanvas-search">
            <Offcanvas.Header>
                <div className="inner">
                    <div className="offcanvas-search-form">
                        <button onClick={handleCloseAndClear('search')} className="offcanvas-close">
                            ×
                        </button>
                        <form onSubmit={formAction}>
                            <div className="row mb-n3">
                                <div className="col-lg-8 col-12 mb-3">
                                    <input
                                        type="text"
                                        {...inputPropertiesRegister('name')}
                                        placeholder={formErrors.name ? 'Не сте въвели име' : 'Търсене на продукти...'}
                                        className={formErrors.name ? 'input-error' : ''}
                                    />
                                </div>
                                <div className="col-lg-4 col-12 mb-3">
                                    <select className="search-select select2-basic" {...inputPropertiesRegister('category')}>
                                        <option value="all">Всички категории</option>

                                        {/* Правилно отваряне и затваряне на JS блока и таговете */}
                                        {Array.isArray(data) &&
                                            data.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat
                                                        .split('-')
                                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(' ')}
                                                </option>
                                            ))}
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
                    ) : (
                        <p>Няма намерени продукти.</p>
                    )}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
