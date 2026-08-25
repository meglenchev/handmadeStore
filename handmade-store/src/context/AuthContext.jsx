import { useLocalStorage } from '@/hooks/useLocalStorage.jsx';
import { useMutation } from '@/hooks/useMutation.jsx';
import { ENDPOINTS } from '@/utils/endpoints.js';
import { createContext, useState } from 'react';

const AuthContext = createContext({
    auth: null,
    authRole: null,
    isLoggedIn: false,
    onLogin: () => {},
    onLogout: () => {},
});

export function AuthProvider({ children }) {
    const [authRole, setAuthRole] = useState(null);
    const [auth, setAuth] = useLocalStorage('auth', null);
    const { mutate: login, loading: loginLoading, error: loginError } = useMutation(ENDPOINTS.AUTH.LOGIN);

    const isLoggedIn = !!auth?._id;

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
        authRole,
        isLoggedIn,
        onLogin,
        onLogout,
        loginLoading,
        loginError,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export default AuthContext;
