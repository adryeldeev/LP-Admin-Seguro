import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Logo from '../../assets/Logo.png';
import getApi from '../../Api/Api';
const Login = () => {
    const api = getApi();
    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    });
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/user', formData);
            if (response.status === 200) {
                localStorage.setItem('site', response.data.token);
                window.location.href = '/';
            }
            else {
                setError('E-mail ou senha incorretos.');
            }
        }
        catch (error) {
            setError('Erro no login. Tente novamente.');
            console.error('Erro no login:', error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-md w-full max-w-sm", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("img", { src: Logo, alt: "Logo", className: "h-16 w-auto" }) }), _jsx("h2", { className: "text-2xl font-bold text-center mb-4", children: "Login" }), error && _jsx("p", { className: "text-red-500 text-sm mb-4", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "E-mail" }), _jsx("input", { type: "email", name: "email", id: "email", value: formData.email, onChange: handleChange, required: true, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Senha" }), _jsx("input", { type: "password", name: "password", id: "password", value: formData.password, onChange: handleChange, required: true, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" })] }), _jsx("button", { type: "submit", disabled: loading, className: `w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`, children: loading ? 'Carregando...' : 'Entrar' })] }), _jsxs("p", { className: "mt-4 text-sm text-center text-gray-600", children: ["N\u00E3o tem uma conta? ", _jsx("a", { href: "/register", className: "text-blue-600 hover:underline", children: "Registrar" })] })] }) }));
};
export default Login;
