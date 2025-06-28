import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { useAuth } from '../../Context/AuthProvider';
import getApi from '../../Api/Api';
const Dashboard = () => {
    const api = getApi();
    const { isAuthenticated, logOut } = useAuth();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const leadsPerPage = 10;
    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await api.get('/lead');
                if (response.status === 200) {
                    setLeads(response.data);
                }
                else {
                    setError('Erro ao carregar os leads.');
                }
            }
            catch (err) {
                console.error('Erro ao buscar leads:', err);
                setError('Erro ao carregar os leads.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, [api]);
    const filteredLeads = leads.filter(lead => lead.nome.toLowerCase().includes(search.toLowerCase()) ||
        lead.telefone.includes(search) ||
        lead.cidade.toLowerCase().includes(search.toLowerCase()));
    const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
    const paginatedLeads = filteredLeads.slice((page - 1) * leadsPerPage, page * leadsPerPage);
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };
    // Função para formatar telefone para WhatsApp
    function formatarTelefone(telefone) {
        const numeros = telefone.replace(/\D/g, '');
        return numeros.startsWith('55') ? numeros : '55' + numeros;
    }
    return (_jsxs(_Fragment, { children: [_jsx("nav", { className: "bg-white shadow-md", children: _jsxs("ul", { className: "flex flex-col sm:flex-row items-center justify-between px-6 py-4 space-y-2 sm:space-y-0", children: [_jsxs("li", { className: "flex items-center space-x-3", children: [_jsx("img", { src: Logo, alt: "Logo", className: "h-10 w-auto" }), _jsx("span", { className: "text-xl font-semibold whitespace-nowrap", children: "4s Seguro - Admin" })] }), _jsx("li", { className: "flex items-center space-x-4", children: isAuthenticated ? (_jsx("button", { onClick: logOut, className: "text-gray-700 hover:text-red-500 font-semibold", children: "Sair" })) : (_jsx(Link, { to: "/login", className: "text-gray-700 hover:text-blue-500 font-semibold", children: "Login" })) })] }) }), _jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-2", children: "Lista de Leads" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Visualize e gerencie os leads cadastrados." }), _jsx("input", { type: "text", value: search, onChange: handleSearchChange, placeholder: "Buscar por nome, telefone ou cidade...", className: "mb-6 w-full max-w-xs sm:max-w-md p-2 border border-gray-300 rounded-md" }), loading ? (_jsx("p", { children: "Carregando..." })) : error ? (_jsx("p", { className: "text-red-500", children: error })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full bg-white border border-gray-200", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left", children: "Nome" }), _jsx("th", { className: "px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left", children: "Telefone" }), _jsx("th", { className: "px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left", children: "Tipo de Acidente" }), _jsx("th", { className: "px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left", children: "Cidade" }), _jsx("th", { className: "px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left", children: "Data do Acidente" }), _jsx("th", { className: "px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left", children: "A\u00E7\u00F5es" })] }) }), _jsx("tbody", { children: paginatedLeads.map((lead) => {
                                                const telefoneFormatado = formatarTelefone(lead.telefone);
                                                const mensagem = encodeURIComponent(`Olá ${lead.nome}, recebemos seu contato e logo entraremos em contato!`);
                                                const whatsappLink = `https://wa.me/${telefoneFormatado}?text=${mensagem}`;
                                                return (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base", children: lead.nome }), _jsx("td", { className: "px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base", children: lead.telefone }), _jsx("td", { className: "px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base", children: lead.tipoAcidente }), _jsx("td", { className: "px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base", children: lead.cidade }), _jsx("td", { className: "px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base", children: new Date(lead.dataAcidente).toLocaleDateString() }), _jsx("td", { className: "px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base", children: _jsx("a", { href: whatsappLink, target: "_blank", rel: "noopener noreferrer", className: "text-green-600 hover:text-green-800 font-semibold", children: "Enviar WhatsApp" }) })] }, lead.id));
                                            }) })] }) }), _jsxs("div", { className: "flex flex-col sm:flex-row justify-center mt-6 space-y-2 sm:space-y-0 sm:space-x-2", children: [_jsx("button", { onClick: () => setPage(1), disabled: page === 1, className: "px-3 py-1 bg-gray-100 border rounded disabled:opacity-50 cursor-pointer", children: "\u23EE In\u00EDcio" }), _jsx("button", { onClick: () => setPage((p) => Math.max(p - 1, 1)), disabled: page === 1, className: "px-3 py-1 bg-gray-100 border rounded disabled:opacity-50 cursor-pointer", children: "\u25C0 Voltar" }), _jsxs("span", { className: "px-4 py-1 text-sm text-center", children: ["P\u00E1gina ", page, " de ", totalPages] }), _jsx("button", { onClick: () => setPage((p) => Math.min(p + 1, totalPages)), disabled: page === totalPages, className: "px-3 py-1 bg-gray-100 border rounded disabled:opacity-50 cursor-pointer", children: "Pr\u00F3ximo \u25B6" }), _jsx("button", { onClick: () => setPage(totalPages), disabled: page === totalPages, className: "px-3 py-1 bg-gray-100 border rounded disabled:opacity-50 cursor-pointer", children: "Fim \u23ED" })] })] }))] })] }));
};
export default Dashboard;
