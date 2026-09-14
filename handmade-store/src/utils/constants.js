import { ENDPOINTS } from '@/utils/endpoints.js';
import { Dashboard } from '@/pages/Account/components/Dashboard.jsx';
import { Orders } from '@/pages/Account/components/Orders.jsx';
import { Address } from '@/pages/Account/components/Address.jsx';
import { AccountDetails } from '@/pages/Account/components/AccountDetails.jsx';

export const HEADER_LINKS = [
    { to: '/', label: 'Начало' },
    { to: '/products', label: 'Магазин' },
    { to: '/about-us', label: 'За нас' },
    { to: '/wishlist', label: 'Любими' },
    { to: '/contact-us', label: 'Контакти' },
    { to: '/privacy-policy', label: 'Политика за сигурност' },
];

export const ACCOUNT_TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', endpoint: ENDPOINTS.ACCOUNT.DASHBOARD, Component: Dashboard },
    { id: 'orders', label: 'Orders', icon: 'file-alt', endpoint: ENDPOINTS.ACCOUNT.ORDERS, Component: Orders },
    { id: 'address', label: 'Address', icon: 'map-marker-alt', endpoint: ENDPOINTS.ACCOUNT.ADDRESS, Component: Address },
    { id: 'accountDetails', label: 'Account Details', icon: 'user', endpoint: ENDPOINTS.ACCOUNT.DETAILS, Component: AccountDetails },
];
