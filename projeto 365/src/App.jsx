
import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // alert('funcionando');
    fetch("http://localhost:3000/usuarios")
      .then(response => response.json())
      .then(dados => setUsuarios(dados))
      .catch(erro => console.log(erro))

  }, [])

  return (
    <>
      <h1>Meu App</h1>

      {!!usuarios && usuarios.map(usuario => (
        <h2 key={usuario.id}> {usuario.nome}</h2>

      ))}
    </>
  )
}

export default App
