import { Offcanvas } from 'react-bootstrap';
import { useForm } from '@/hooks/useForm.js';
import { useMemo, useState } from 'react';
import { ENDPOINTS } from '@/utils/endpoints.js';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import { useQuery } from '@/hooks/useQuery.js';
import Select from 'react-select';

const initialSearchValues = {
    name: '',
    category: 'all',
};

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#ffffff',
        borderRadius: '0',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderWidth: '2px',
        borderColor: state.isFocused ? '#f8796c' : '#333333', // Бордер при фокус и нормално състояние
        boxShadow: state.isFocused ? '0' : 'none',
        cursor: 'pointer',
        '&:hover': {
            borderColor: '#f8796c', // Бордер при ховър
        },
        color: '#333333',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#333333', // Цвят на текста на избраната опция
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#ffffff', // Фон на падащото меню
        border: 'none',
        boxShadow: 'none',
        borderRadius: '0',
        padding: '0',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? '#ff6b6b' // Фон на избраната опция вътре в менюто
            : state.isFocused
              ? '#98d8ca' // Фон при посочване с мишката (hover)
              : '#f2f2f2', // Нормален фон на опция
        color: state.isSelected ? '#ffffff' : '#333333', // Цвят на текста
        cursor: 'pointer',
        '&:hover': {
            color: '#ffffff',
        },
        '&:active': {
            backgroundColor: '#f8796c',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#666666', // Цвят на placeholder текста
    }),
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

    const submitSearch = async (currentFormValues) => {
        const searchWord = currentFormValues.name ? currentFormValues.name.trim() : '';
        const selectedCategory = currentFormValues.category || 'all';

        if (!searchWord && selectedCategory === 'all') {
            return;
        }

        setIsLoading(true);

        try {
            const queryParams = new URLSearchParams({
                query: searchWord,
                category: selectedCategory,
            });

            const response = await fetch(`${BASE_URL}${ENDPOINTS.PRODUCTS.SEARCH}?${queryParams}`);

            if (!response.ok) {
                throw new Error('Грешка при извличане на данните');
            }

            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error('Грешка при търсене:', err.message);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const { inputPropertiesRegister, formValues, setFormValues } = useForm(() => {}, initialSearchValues, null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitSearch(formValues);
    };

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
                                        defaultValue={selectOptions[0]}
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
                    ) : (
                        <p>Няма намерени продукти.</p>
                    )}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
