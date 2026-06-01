export const ENDPOINTS = {
    PRODUCTS: {
        SPECIAL: '/products/special',
        ALL: '/products',
        LATEST_FILTERED: (category) => `/products/latest?category=${category}&limit=6`,
        DISCOUNTED: '/products/discounted',
        DETAILS: (productId) => `/products/${productId}/details`,
    },
};
