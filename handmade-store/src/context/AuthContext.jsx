import { useLocalStorage } from '@/hooks/useLocalStorage.jsx';
import { useMutation } from '@/hooks/useMutation.jsx';
import { apiGet } from '@/utils/apiClient.js';
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
        const abortController = new AbortController();

        const verifySession = async () => {
            try {
                const result = await apiGet(ENDPOINTS.AUTH.ME, { signal: abortController.signal });
                setAuth({ _id: result._id, username: result.username, role: result.role });
                setAuthRole(result.role);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setAuth(null);
                    setAuthRole(null);
                    console.error('Session verification failed:', err.message);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setIsAuthLoading(false);
                }
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
        loginError,
    };

    return <AuthContext.Provider value={authContextValue}>{isAuthLoading ? null : children}</AuthContext.Provider>;
}

export default AuthContext;
