import React from 'react'
import  Logo from '../../assets/Logo.png'
import useApi from '../../Api/Api'
const Login = () => {
    const api  = useApi()
 const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await api.post('/user', formData)
      if (response.status === 200) {
        localStorage.setItem('site', response.data.token)
        window.location.href = '/'
      } else {
        setError('E-mail ou senha incorretos.')
      }
    } catch (error) {
      setError('Erro no login. Tente novamente.')
        console.error('Erro no login:', error)
    } finally {
      setLoading(false)
    }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16 w-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Não tem uma conta? <a href="/register" className="text-blue-600 hover:underline">Registrar</a>
        </p>
      </div>
    </div>


  )
}

export default Login