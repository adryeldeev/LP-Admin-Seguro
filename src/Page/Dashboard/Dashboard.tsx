import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useApi from '../../Api/Api'
import Logo from '../../assets/Logo.png'
import { useAuth } from '../../Context/AuthProvider'

interface Lead {
  id: number;
  nome: string;
  telefone: string;
  tipoAcidente: string;
  cidade: string;
  dataAcidente: string;
}

const Dashboard = () => {
  const api = useApi()
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

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <ul className="flex items-center justify-between px-6 py-4">
          <li className="flex items-center">
            <img src={Logo} alt="Logo" className="h-10 w-auto mr-3" />
            <span className="text-xl font-semibold">4s Seguro - Admin</span>
          </li>
          <li className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>

                <button onClick={logOut} className="text-gray-700 hover:text-red-500">Sair</button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
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
          className="mb-6 w-full max-w-md p-2 border border-gray-300 rounded-md"
        />

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b">Nome</th>
                  <th className="px-6 py-3 border-b">Telefone</th>
                  <th className="px-6 py-3 border-b">Tipo de Acidente</th>
                  <th className="px-6 py-3 border-b">Cidade</th>
                  <th className="px-6 py-3 border-b">Data do Acidente</th>
                  <th className="px-6 py-3 border-b">Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 border-b">{lead.nome}</td>
                    <td className="px-6 py-4 border-b">{lead.telefone}</td>
                    <td className="px-6 py-4 border-b">{lead.tipoAcidente}</td>
                    <td className="px-6 py-4 border-b">{lead.cidade}</td>
                    <td className="px-6 py-4 border-b">{new Date(lead.dataAcidente).toLocaleDateString()}</td>
                  
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginação */}
            <div className="flex justify-center mt-6 space-x-2">
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
              <span className="px-4 py-1 text-sm">Página {page} de {totalPages}</span>
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
