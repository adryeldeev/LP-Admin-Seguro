import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import useApi from '../../Api/Api';
import Logo from '../../assets/Logo.png';
const CadastroUser = () => {
    const api = useApi();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        // Validação só no frontend
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.');
            setLoading(false);
            return;
        }
        try {
            // Envia apenas os dados necessários para o backend
            const { name, email, password } = formData;
            const response = await api.post('/userCreate', { name, email, password });
            if (response.status === 201) {
                window.location.href = '/login';
            }
            else {
                setError('Erro ao cadastrar usuário. Tente novamente.');
            }
        }
        catch (error) {
            setError('Erro ao cadastrar usuário. Tente novamente.');
            console.error('Erro no cadastro:', error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-md w-full max-w-sm", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("img", { src: Logo, alt: "Logo", className: "h-16 w-auto" }) }), _jsx("h2", { className: "text-2xl font-bold text-center mb-4", children: "Cadastro de Usu\u00E1rio" }), error && _jsx("p", { className: "text-red-500 text-sm mb-4", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Nome" }), _jsx("input", { type: "text", name: "name", id: "name", value: formData.name, onChange: handleChange, required: true, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "E-mail" }), _jsx("input", { type: "email", name: "email", id: "email", value: formData.email, onChange: handleChange, required: true, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Senha" }), _jsx("input", { type: "password", name: "password", id: "password", value: formData.password, onChange: handleChange, required: true, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700", children: "Confirmar Senha" }), _jsx("input", { type: "password", name: "confirmPassword", id: "confirmPassword", value: formData.confirmPassword, onChange: handleChange, required: true, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" })] }), _jsx("button", { type: "submit", disabled: loading, className: `w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`, children: loading ? 'Carregando...' : 'Cadastrar' })] }), _jsxs("p", { className: "mt-4 text-sm text-center text-gray-600", children: ["J\u00E1 tem uma conta? ", _jsx("a", { href: "/login", className: "text-blue-600 hover:underline", children: "Entrar" })] })] }) }));
};
export default CadastroUser;
