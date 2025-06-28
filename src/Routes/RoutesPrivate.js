import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
const PrivateRoutes = () => {
    const { token, loading } = useAuth();
    if (loading)
        return _jsx("p", { children: "Carregando..." }); // ou spinner
    return token ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login", replace: true });
};
export default PrivateRoutes;
