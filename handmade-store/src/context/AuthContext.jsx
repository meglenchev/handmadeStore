import { useLocalStorage } from '@/hooks/useLocalStorage.jsx';
import { useMutation } from '@/hooks/useMutation.jsx';
import { useQuery } from '@/hooks/useQuery.js';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    auth: null,
    isAuthenticated: false,
    authRole: null,
    isLoggedIn: false,
    isAuthLoading: true,
    onLogin: () => {},
    onLogout: () => {},
});

export function AuthProvider({ children }) {
    const [authRole, setAuthRole] = useState(null);
    const [auth, setAuth] = useLocalStorage('auth', null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    const { mutate: login, loading: loginLoading, error: loginError } = useMutation(ENDPOINTS.AUTH.LOGIN);

    const isLoggedIn = !!auth?._id;

    useEffect(() => {
        const verifySession = async () => {
            try {
                const result = await useQuery(ENDPOINTS.AUTH.ME);

                setAuth({ _id: result.user._id, username: result.user.username, role: result.user.role });
                setAuthRole(result.user.vendorStatus);
            } catch (err) {
                setAuth(null);
                setAuthRole(null);
            } finally {
                setIsAuthLoading(false);
            }
        };

        verifySession();
    }, []);

    const onLogin = async (loginData) => {
        const result = await login(loginData);

        setAuth({
            _id: result.user._id,
            username: result.user.username,
            role: result.user.role,
        });

        setAuthRole(result.user.vendorStatus);

        return result;
    };

    const onLogout = () => {
        setAuth(null);
        setAuthRole(null);
    };

    const authContextValue = {
        auth,
        isAuthenticated: !!auth?._id,
        authRole,
        isLoggedIn,
        onLogin,
        onLogout,
        loginLoading,
        loginLoading,
        loginError,
    };

    return <AuthContext.Provider value={authContextValue}>{isAuthLoading ? null : children}</AuthContext.Provider>;
}

export default AuthContext;
