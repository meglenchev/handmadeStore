import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import AuthContext from '@/context/AuthContext.jsx';

export function PublicOnlyRoute() {
    const { isLoggedIn, isAuthLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isAuthLoading) {
        return null; // TODO: Да се замени `null` с loading spinner/skeleton, докато isAuthLoading е true - за да няма чисто бял екран по време на първоначалната проверка на сесията.
    }

    if (isLoggedIn) {
        return <Navigate to="/auth/profile" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
