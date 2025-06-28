import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext(undefined);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!token;
    const navigate = useNavigate();
    // Login
    const loginAction = async (credentials) => {
        try {
            const response = await axios.post("https://my-project-landig-page-production.up.railway.app/login", credentials);
            const { token } = response.data;
            if (token) {
                localStorage.setItem("site", token);
                setToken(token);
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
                setError("");
                navigate("/");
            }
        }
        catch (err) {
            const status = err?.response?.status;
            if (status === 401)
                setError("E-mail ou senha incorretos.");
            else if (status === 404)
                setError("Usuário não encontrado.");
            else
                setError("Erro no login. Tente novamente.");
        }
    };
    // Logout
    const logOut = () => {
        localStorage.removeItem("site");
        setUser(null);
        setToken("");
        navigate("/login");
    };
    // Verificar se já existe token ao iniciar
    useEffect(() => {
        const storedToken = localStorage.getItem("site");
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                setUser(decoded);
                setToken(storedToken);
            }
            catch {
                localStorage.removeItem("site");
            }
        }
        setLoading(false);
    }, []);
    return (_jsx(AuthContext.Provider, { value: { user, token, loginAction, logOut, error, loading, isAuthenticated }, children: children }));
};
export default AuthProvider;
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
