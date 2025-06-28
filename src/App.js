import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import CadastroUser from "./Page/CadastroUser/CadastroUser";
import Login from "./Page/Login/Login";
import PrivateRoutes from "./Routes/RoutesPrivate";
import Dashboard from "./Page/Dashboard/Dashboard";
function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/register", element: _jsx(CadastroUser, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { element: _jsx(PrivateRoutes, {}), children: _jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }) })] }) }) }));
}
export default App;
