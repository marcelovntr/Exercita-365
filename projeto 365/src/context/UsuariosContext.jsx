
import { createContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

export const UsuariosContext = createContext();

export const UsuariosContextProvider = ({ children }) => {


  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const [usuarios, setUsuarios] = useState([]);

  const [novoUsuario, setNovousuario] = useState({
    nome: "", sexo: "", cpf: "", nascimento: "", email: "", senha: "", cep: "", endereco: "", complemento: "", numero: "", bairro: "",
    cidade: "", estado: "", logado: false
  });


  const [novoUsuarioEdicao, setNovousuarioEdicao] = useState({
    nome: "", sexo: "", cpf: "", nascimento: "", email: "", senha: "", cep: "", endereco: "", complemento: "", numero: "", bairro: "",
    cidade: "", estado: "", logado: false
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEdicao, setMostrarEdicao] = useState(false);

  useEffect(() => { //< ------- EXECUTAR APENAS QDO A PÁGINA CARREGAR --> PARA EXIBIR LISTAS E AFINS
    // alert('funcionando');
    // fetch("http://localhost:3000/usuarios")
    //   .then(response => response.json())
    //   .then(dados => setUsuarios(dados))
    //   .catch(erro => console.log(erro))
    lerUsuarios();
  }, [])

  function lerUsuarios() {
    fetch("http://localhost:3000/usuarios")
      .then(response => response.json())
      .then(dados => setUsuarios(dados))
      .catch(erro => console.log(erro))
  }


  async function buscarCpf(novoUsuario) {
    try {
      let resposta = await fetch("http://localhost:3000/usuarios");
      let dados = await resposta.json();

      let cpfExistente = dados.some(user => user.cpf === novoUsuario.cpf);

      if (cpfExistente) {
        alert('CPF já cadastrado. Por favor, insira um CPF único.');
      } else {
        cadastrarUsuario(novoUsuario);
      }
    } catch {
      alert('Erro ao buscar usuários.');
    }
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
      .then(() => {
        alert('adicionado com sucesso!');
        lerUsuarios();
      })
      .catch(() => alert('errinho ao adicionar!'));
  }


  function lerUsuariosPorId(id) { //<-- NO BOTÃO DE EDITAR A GENTE GUARDA O ID + abre a página do formulário + faz o GET + id
    fetch("http://localhost:3000/usuarios/" + id)
      .then(response => response.json())
      .then(dados => setUsuarios(dados))
      .catch(erro => console.log(erro))
  }

  async function lerUsuariosPorId(id) { //<-- NO BOTÃO DE EDITAR A GENTE GUARDA O ID + abre a página do formulário + faz o GET + id
    try {
      let resultado = await fetch("http://localhost:3000/usuarios/" + id)
      return resultado.json()
    } catch {

    }
  }


  function editarUsuario(dadosUsuario, id) {
    fetch("http://localhost:3000/usuarios/" + id, {
      method: "PUT",
      body: JSON.stringify(dadosUsuario),
      headers: {
        'Content-Type': 'application/json',

      },
    }
    )
      .then(() => {
        alert('atualizado com sucesso!');
        lerUsuarios();
      })
      .catch(() => alert('errinho ao atualizar!'));
  }

  function apagarLocal(id) {
    const confirmarExclusao = window.confirm('Tem certeza que deseja apagar este local?');
    if (confirmarExclusao) {
      fetch("http://localhost:3000/listaLocais/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert('Local apagado com sucesso!');
          lerLocais();
        })
        .catch(() => alert('errinho ao apagar!'));
    }
    alert('Exclusão cancelada.');
  }


  async function procurarUsuario(emailLogin, senhaLogin) { //<--função login!!!!!!!
    try {
      let response = await fetch("http://localhost:3000/usuarios/");
      let listaCadastrados = await response.json();

      let usuarioEncontrado = listaCadastrados.filter(user => user.email == emailLogin);
      if (usuarioEncontrado.length > 0) {
        let usuario = usuarioEncontrado[0]; // primeiro usuário encontrado
        if (usuario.senha == senhaLogin) {
          // Senha correta
          //VALIDADO!!!
          alert('SUCESSO!')
          console.log('Senha correta');
          //LÓGICA DE GUARDAR ID E STAR ONLINE
          console.log('id: ', usuario.id);
          //let idLogado = usuario.id???
          localStorage.setItem('loginAutenticado', true);
          localStorage.setItem('idCadastrante', usuario.id);

          window.location.href = "/";
          return
        } else {
          // Senha incorreta
          console.log('Senha incorreta');
          alert('Usuário ou Senha incorretos')
          //return?????????
        }
      } else {
        console.log('Usuário não encontrado');
        alert('Usuário não encontrado');
      }
    } catch (error) {
      alert('Erro ao buscar usuários');
    }
  }

  function sair() {
    localStorage.removeItem('loginAutenticado');
    localStorage.removeItem('idCadastrante');

    //OU: localStorage.clear();
    window.location.href = "/login";
}


  //*****************************CONTEXTO LOCAIS*****************************************************************************
  //*******************************               ***************************************************************************
  const [listalocais, setListaLocais] = useState([]);
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
    praticasEsportivas: [],
    idCadastrante: ""
  });

  const [mostrarCadLocal, setCadLocal] = useState(true);
  const [mostrarEdicaoLocal, setMostrarEdicaoLocal] = useState(false);

  useEffect(() => { //< ------- EXECUTAR APENAS QDO A PÁGINA CARREGAR --> PARA EXIBIR LISTAS E AFINS

    lerLocais();
  }, [])

  function lerLocais() {
    fetch("http://localhost:3000/listaLocais")
      .then(response => response.json())
      .then(dados => setListaLocais(dados))
      .catch(erro => console.log(erro))
  }

  function lerLocaisById(id) {
    fetch("http://localhost:3000/listaLocais/" + id)
      .then((response) => response.json())
      .then((dados) => {
        setListaLocais(dados)
        setValue('nomeLocal', dados.nomeLocal);
        setValue('descricaoLocal', dados.descricaoLocal);
        setValue('cep', dados.cep);
        setValue('endereco', dados.endereco);
        setValue('bairro', dados.bairro);
        setValue('cidade', dados.cidade);
        setValue('estado', dados.estado);
        setValue('estado', dados.estado);
        setValue('latitude', dados.latitude);
        setValue('longitude', dados.longitude);
        setValue('praticasEsportivas', dados.praticasEsportivas);

      })

      .catch((erro) => console.log(erro))
  }

  async function lerLocaisByIdAsync(id) {
    console.log("ID do local:", id);
    try {
      let resultado = await fetch("http://localhost:3000/listaLocais/" + id);
      let dados = await resultado.json();
      console.log("Dados do local:", dados);
      return dados;
    } catch (error) {
      console.error("Erro ao ler local por ID:", error);
    }
  }

  function editarLocais(dadosLocais, id) {
    fetch("http://localhost:3000/listaLocais/" + id, {
      method: "PUT",
      body: JSON.stringify(dadosLocais),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    )
      .then(() => {
        alert('atualizado com sucesso!');
        lerLocais();
      })
      .catch(() => alert('errinho ao atualizar!'));
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
      .then(() => {
        alert('LOCAL adicionado com sucesso!')
        lerLocais();
      })
      .catch(() => alert('erro ao adicionar!'))
  }



  return (
    <UsuariosContext.Provider value={{
      usuarios, setUsuarios, lerUsuarios, cadastrarUsuario, novoUsuario, editarUsuario, apagarLocal, 
      listalocais, setListaLocais, lerLocais, cadastrarLocais,
      lerUsuariosPorId, mostrarEdicao, setMostrarEdicao, mostrarFormulario, setMostrarFormulario,
      mostrarCadLocal, setCadLocal, mostrarEdicaoLocal, setMostrarEdicaoLocal, editarLocais, procurarUsuario, buscarCpf,
      lerLocaisById, lerLocaisByIdAsync, sair
    }}>
      {children}
    </UsuariosContext.Provider>
  )
}