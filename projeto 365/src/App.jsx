import './App.css'
import Header from "./components/header";
import Footer from "./components/footer";
import { UsuariosContextProvider } from "./context/UsuariosContext";
import { Outlet } from 'react-router-dom';

function App() {

  return (
   <>
      <Header />

      <Outlet />

      <Footer />

    </>
    
  )
}

export default App
