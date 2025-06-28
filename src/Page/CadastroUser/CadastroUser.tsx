import React from 'react'
import Logo from '../../assets/Logo.png'
import getApi from '../../Api/Api'

const CadastroUser = () => {
    const api = getApi()
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
 
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("As senhas não coincidem.");
    setLoading(false);
    return;
  }

  try {
    const { name, email, password } = formData;
    const response = await api.post("/userCreate", { name, email, password });

    if (response.status === 201) {
      window.location.href = "/login";
    } else {
      setError("Erro ao cadastrar usuário. Tente novamente.");
    }
  } catch (error) {
    setError("Erro ao cadastrar usuário. Tente novamente.");
    console.error("Erro no cadastro:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16 w-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Cadastro de Usuário</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
            <input
              type="password"
              name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Carregando...' : 'Cadastrar'}
            </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
            Já tem uma conta? <a href="/login" className="text-blue-600 hover:underline">Entrar</a>
        </p>
      </div>
    </div>

  )
}

export default CadastroUser