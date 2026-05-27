export const ENDPOINTS = {
    PRODUCTS: {
        ALL: '/products',
        LATEST: '/products/latest',
        DISCOUNTED: '/products/discounted',
        DETAILS: (productId) => `/products/${productId}/details`,
    },
};
