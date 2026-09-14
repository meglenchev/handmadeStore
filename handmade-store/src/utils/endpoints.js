export const ENDPOINTS = {
    PRODUCTS: {
        SEARCH: '/products/search',
        ALL_CATEGORY: '/products/categories',
        SPECIAL: '/products/special',
        ALL: (search) => `/products${search}`,
        CHECK_PRODUCT: '/products/check',
        LATEST_FILTERED: (category) => `/products/latest?category=${category}&limit=6`,
        DISCOUNTED: '/products/discounted',
        DETAILS: (productId) => `/products/${productId}/details`,
    },
    AUTH: {
        LOGIN: '/users/login',
        REGISTER: '/users/register',
        ME: '/users/me',
    },
    ACCOUNT: {
        DASHBOARD: '/users/me',
        ORDERS: '/users/account/orders',
        ADDRESS: '/users/account/address',
        DETAILS: '/users/account/details',
    },
};
