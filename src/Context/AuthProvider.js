import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
// TIPAGEM aplicada aqui 👇
const AuthContext = createContext(undefined);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!token;
    const navigate = useNavigate();
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
            const error = err;
            const status = error.response?.status;
            if (status === 401)
                setError("E-mail ou senha incorretos.");
            else if (status === 404)
                setError("Usuário não encontrado.");
            else
                setError("Erro no login. Tente novamente.");
        }
    };
    const logOut = () => {
        localStorage.removeItem("site");
        setUser(null);
        setToken("");
        navigate("/login");
    };
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
// Hook personalizado
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
