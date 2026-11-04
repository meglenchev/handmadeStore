// Feature flags. Toggle via .env (VITE_FEATURE_*) without touching components.
export const FEATURES = {
    // TODO(coupon): enable after backend coupon support is implemented
    // (Coupon/Redemption models, server-side pricing, atomic usage claim on order)
    coupons: import.meta.env.VITE_FEATURE_COUPON === 'true',
};
