import { useLocalStorage } from '@/hooks/useLocalStorage.jsx';
import { useMutation } from '@/hooks/useMutation.jsx';
import { apiGet } from '@/utils/apiClient.js';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { createContext, useCallback, useEffect, useState, useMemo } from 'react';

const AuthContext = createContext({
    auth: null,
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

    const applySession = useCallback(
        (user) => {
            setAuth({ _id: user._id, username: user.username, role: user.role });
            setVendorStatus(user.vendorStatus);
        },
        [setAuth]
    );

    const clearSession = useCallback(() => {
        setAuth(null);
        setVendorStatus(null);
    }, [setAuth]);

    const isLoggedIn = !!auth?._id;

    useEffect(() => {
        const abortController = new AbortController();

        const verifySession = async () => {
            try {
                const result = await apiGet(ENDPOINTS.AUTH.ME, { signal: abortController.signal });

                applySession(result.user);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    clearSession();

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

        applySession(result.user);

        return result;
    };

    const onLogin = async (loginData) => {
        const result = await login(loginData);

        applySession(result.user);

        return result;
    };

    const onLogout = useCallback(() => {
        clearSession();
    }, [clearSession]);

    const authContextValue = useMemo(
        () => ({
            auth,
            isLoggedIn,
            vendorStatus,
            isAuthLoading,
            onLogin,
            loginLoading,
            loginError,
            onRegister,
            registerLoading,
            registerError,
            onLogout,
        }),
        [auth, isLoggedIn, vendorStatus, isAuthLoading, onLogin, loginLoading, loginError, onRegister, registerLoading, registerError, onLogout]
    );

    return <AuthContext.Provider value={authContextValue}>{isAuthLoading ? null : children}</AuthContext.Provider>;
}

export default AuthContext;
