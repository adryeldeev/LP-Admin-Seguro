import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import { useAuth } from '../../Context/AuthProvider'
import getApi from '../../Api/Api'

interface Lead {
  id: number;
  nome: string;
  telefone: string;
  tipoAcidente: string;
  cidade: string;
  dataAcidente: string;
}

const Dashboard = () => {
  const api = getApi()
  const { isAuthenticated, logOut } = useAuth()

  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const leadsPerPage = 10

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await api.get('/lead')
        if (response.status === 200) {
          setLeads(response.data)
        } else {
          setError('Erro ao carregar os leads.')
        }
      } catch (err) {
        console.error('Erro ao buscar leads:', err)
        setError('Erro ao carregar os leads.')
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [api])

  const filteredLeads = leads.filter(lead =>
    lead.nome.toLowerCase().includes(search.toLowerCase()) ||
    lead.telefone.includes(search) ||
    lead.cidade.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage)
  const paginatedLeads = filteredLeads.slice(
    (page - 1) * leadsPerPage,
    page * leadsPerPage
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  // Função para formatar telefone para WhatsApp
  function formatarTelefone(telefone: string) {
    const numeros = telefone.replace(/\D/g, '')
    return numeros.startsWith('55') ? numeros : '55' + numeros
  }

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <ul className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 space-y-2 sm:space-y-0">
          <li className="flex items-center space-x-3">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
            <span className="text-xl font-semibold whitespace-nowrap">4s Seguro - Admin</span>
          </li>
          <li className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={logOut}
                className="text-gray-700 hover:text-red-500 font-semibold"
              >
                Sair
              </button>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-500 font-semibold">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Lista de Leads</h1>
        <p className="text-gray-600 mb-4">Visualize e gerencie os leads cadastrados.</p>

        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar por nome, telefone ou cidade..."
          className="mb-6 w-full max-w-xs sm:max-w-md p-2 border border-gray-300 rounded-md"
        />

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {/* Tabela com scroll horizontal */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left">Nome</th>
                    <th className="px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left">Telefone</th>
                    <th className="px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left">Tipo de Acidente</th>
                    <th className="px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left">Cidade</th>
                    <th className="px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left">Data do Acidente</th>
                    <th className="px-2 py-1 sm:px-6 sm:py-3 border-b text-sm sm:text-base text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeads.map((lead) => {
                    const telefoneFormatado = formatarTelefone(lead.telefone)
                    const mensagem = encodeURIComponent(`Olá ${lead.nome}, recebemos seu contato e logo entraremos em contato!`)
           
                    const whatsappLink = `https://wa.me/${telefoneFormatado}?text=${mensagem}`

                    return (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base">{lead.nome}</td>
                        <td className="px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base">{lead.telefone}</td>
                        <td className="px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base">{lead.tipoAcidente}</td>
                        <td className="px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base">{lead.cidade}</td>
                        <td className="px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base">
                          {new Date(lead.dataAcidente).toLocaleDateString()}
                        </td>
                        <td className="px-2 py-1 sm:px-6 sm:py-4 border-b text-sm sm:text-base">
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 font-semibold"
                          >
                            Enviar WhatsApp
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div className="flex flex-col sm:flex-row justify-center mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-100 border rounded disabled:opacity-50 cursor-pointer"
              >
                ⏮ Início
              </button>
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-100 border rounded disabled:opacity-50 cursor-pointer"
              >
                ◀ Voltar
              </button>
              <span className="px-4 py-1 text-sm text-center">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-100 border rounded disabled:opacity-50 cursor-pointer"
              >
                Próximo ▶
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="px-3 py-1 bg-gray-100 border rounded disabled:opacity-50 cursor-pointer"
              >
                Fim ⏭
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Dashboard
