import { useLocalStorage } from '@/hooks/useLocalStorage.jsx';
import { useMutation } from '@/hooks/useMutation.jsx';
import { apiGet } from '@/utils/apiClient.js';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    auth: null,
    isAuthenticated: false,
    vendorStatus: null,
    isLoggedIn: false,
    isAuthLoading: true,
    onLogin: async () => {},
    onRegister: async () => {},
    onLogout: () => {},
});

export function AuthProvider({ children }) {
    const [vendorStatus, setVendorStatus] = useState(null);
    const [auth, setAuth] = useLocalStorage('auth', null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    const { mutate: login, loading: loginLoading, error: loginError } = useMutation(ENDPOINTS.AUTH.LOGIN);
    const { mutate: register, loading: registerLoading, error: registerError } = useMutation(ENDPOINTS.AUTH.REGISTER);

    const isLoggedIn = !!auth?._id;

    useEffect(() => {
        const abortController = new AbortController();

        const verifySession = async () => {
            try {
                const result = await apiGet(ENDPOINTS.AUTH.ME, { signal: abortController.signal });

                setAuth({ _id: result.user._id, username: result.user.username, role: result.user.role });
                setVendorStatus(result.user.vendorStatus);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setAuth(null);
                    setVendorStatus(null);

                    if (err.statusCode !== 401) {
                        console.error('Session verification failed:', err.message);
                    }
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setIsAuthLoading(false);
                }
            }
        };

        verifySession();

        return () => {
            abortController.abort();
        };
    }, []);

    const onRegister = async (registerData) => {
        const result = await register(registerData);

        setAuth({
            _id: result.user._id,
            username: result.user.username,
            role: result.user.role,
        });

        setVendorStatus(result.user.vendorStatus);

        return result;
    };

    const onLogin = async (loginData) => {
        const result = await login(loginData);

        setAuth({
            _id: result.user._id,
            username: result.user.username,
            role: result.user.role,
        });

        setVendorStatus(result.user.vendorStatus);

        return result;
    };

    const onLogout = () => {
        setAuth(null);
        setVendorStatus(null);
    };

    const authContextValue = {
        auth,
        isAuthenticated: !!auth?._id,
        vendorStatus,
        isLoggedIn,
        onLogin,
        loginLoading,
        loginError,
        onRegister,
        registerLoading,
        registerError,
        onLogout,
    };

    return <AuthContext.Provider value={authContextValue}>{isAuthLoading ? null : children}</AuthContext.Provider>;
}

export default AuthContext;
