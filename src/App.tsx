import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import CadastroUser from "./Page/CadastroUser/CadastroUser";
import Login from "./Page/Login/Login";
import PrivateRoutes from "./Routes/RoutesPrivate";
import Dashboard from "./Page/Dashboard/Dashboard";


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<CadastroUser />} />
         <Route path="/login" element={<Login />} /> 
        <Route element={<PrivateRoutes />}>
          {/* Aqui você pode adicionar as rotas privadas */}
          <Route path="/" element={<Dashboard/>} />

          </Route>
        
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App
