export const ENDPOINTS = {
    PRODUCTS: {
        SEARCH: '/products/search',
        ALL_CATEGORY: '/products/categories',
        SPECIAL: '/products/special',
        ALL: '/products',
        CHECK_PRODUCT: '/products/check',
        LATEST_FILTERED: (category) => `/products/latest?category=${category}&limit=6`,
        DISCOUNTED: '/products/discounted',
        DETAILS: (productId) => `/products/${productId}/details`,
    },
};
