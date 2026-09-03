import { useContext } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router';
import AuthContext from '@/context/AuthContext.jsx';

export function ProtectedRoute({ allowedRoles }) {
    const { isLoggedIn, isAuthLoading, auth } = useContext(AuthContext);
    const location = useLocation();

    if (isAuthLoading) {
        return null; // TODO: Да се замени `null` с loading spinner/skeleton, докато isAuthLoading е true - за да няма чисто бял екран по време на първоначалната проверка на сесията.
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
