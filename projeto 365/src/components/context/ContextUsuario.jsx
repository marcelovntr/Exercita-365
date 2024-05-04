
import { createContext, useEffect, useState } from "react";

export const UsuariosContext = createContext();

export const UsuariosContextProvider = ({ children }) => {
    
    
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => { //< ------- EXECUTAR APENAS QDO A PÁGINA CARREGAR --> PARA EXIBIR LISTAS E AFINS
        // alert('funcionando');
        // fetch("http://localhost:3000/usuarios")
        //   .then(response => response.json())
        //   .then(dados => setUsuarios(dados))
        //   .catch(erro => console.log(erro))
    lerUsuarios();
      }, [])

      function lerUsuarios(){
        fetch("http://localhost:3000/usuarios")
        .then(response => response.json())
        .then(dados => setUsuarios(dados))
        .catch(erro => console.log(erro))
      }
    
    
      function cadastrarUsuario(novoUsuario) {
        fetch("http://localhost:3000/usuarios", {
          method: "POST",
          body: JSON.stringify(novoUsuario),
          headers: {
            'Content-Type': 'application/json',
    
          },
        }
        )
        .then(()=>{
            alert('adicionado com sucesso!');
            lerUsuarios();
        })
        .catch(()=> alert('errinho ao adicionar!'));
      }
    

/*********************************************************************** */
/*********************************************************************** */


 function lerUsuariosPorId(id){ //<-- NO BOTÃO DE EDITAR A GENTE GUARDA O ID + abre a página do formulário + faz o GET + id
  fetch("http://localhost:3000/usuarios/"+id)
  .then(response => response.json())
  .then(dados => setUsuarios(dados))
  .catch(erro => console.log(erro))
}



function editarUsuario(usuarios, id) {
  fetch("http://localhost:3000/usuarios/" +id, {
    method: "PUT",
    body: JSON.stringify(usuarios),
    headers: {
      'Content-Type': 'application/json',

    },
  }
  )
  .then(()=>{
      alert('atualizado com sucesso!');
      lerUsuarios();
  })
  .catch(()=> alert('errinho ao atualizar!'));
}

function apagarUsuario(id) {
  fetch("http://localhost:3000/usuarios/" +id, {
    method: "DELETE",
  })
  .then(()=>{
      alert('usuário apagado com sucesso!');
      lerUsuarios();
  })
  .catch(()=> alert('errinho ao apagar!'));
}



//*****************************CONTEXTO LOCAIS*****************************************************************************
const [listalocais, setListaLocais] = useState([]); //<-- vai para o CONTEXT
const [novoLocal, setNovoLocal] = useState({
  nomeLocal: "",
  descricaoLocal: "",
  cep: "",
  endereco: "",
  bairro: "",
  cidade: "",
  estado: "",
  latitude: "",
  longitude: "",
  praticasEsportivas: []
});

useEffect(() => { //< ------- EXECUTAR APENAS QDO A PÁGINA CARREGAR --> PARA EXIBIR LISTAS E AFINS
      
  lerLocais();
    }, [])

  function lerLocais(){
      fetch("http://localhost:3000/listaLocais")
      .then(response => response.json())
      .then(dados => setListaLocais(dados))
      .catch(erro => console.log(erro))
    }


  function cadastrarLocais(novoLocal) {
      fetch("http://localhost:3000/listaLocais", {
        method: "POST",
        body: JSON.stringify(novoLocal),
        headers: {
          'Content-Type': 'application/json',
  
        },
      }
      )
      .then(()=>{
          alert('LOCAL adicionado com sucesso!')
      lerLocais();
      })
      .catch(()=> alert('erro ao adicionar!'))
    }
    
    return (
        <UsuariosContext.Provider value={{usuarios, lerUsuarios, cadastrarUsuario, 
        editarUsuario, apagarUsuario, listalocais, setListaLocais, lerLocais, cadastrarLocais, lerUsuariosPorId}}>
            {children}
        </UsuariosContext.Provider>
    )
}