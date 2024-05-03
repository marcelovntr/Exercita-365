import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useForm } from "react-hook-form"

function PaginaLogin() {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const { usuarios, setUsuarios, cadastrarUsuario, editarUsuario, mostrarFormulario, setMostrarFormulario, mostrarEdicao, setMostrarEdicao,
    apagarUsuario, lerUsuariosPorId, procurarUsuario, lerUsuario } = useContext(UsuariosContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(()=>{
    lerUsuario();
  })
  
  const [cepPreenchido, setCepPreenchido] = useState(false);


  function cadUsuOnsubmit(formValue) {
    
    //ADD lógica do CPF único!!!
    cadastrarUsuario(formValue);
  }

  function buscarCEP(cep, setValue) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        setValue('endereco', data.logradouro);
        setValue('bairro', data.bairro);
        setValue('cidade', data.localidade);
        setValue('estado', data.uf);
        setCepPreenchido(true);
      })
      .catch(error => console.error('Erro ao buscar o CEP:', error));
  }
  const cepOnSubmit = (data) => {
    // Lógica para submeter os dados
    console.log(data);
    // Executar a busca do CEP
    buscarCEP(data.cep, setValue);
    // Restante da lógica de cadastro
  };


  async function editarLogado(id) {
    let dadosAtual = await lerUsuariosPorId(id);
    //no meu vai ser editarUsuario(dadosUsuario, id) -- dadosAtual
    setNovousuarioEdicao(dadosAtual);
    //editarUsuario(dadosUsuario, id)
  }

  function validarLogin(dados) {
    console.log(dados)
    procurarUsuario(dados.email, dados.senha);
  }

  return (



    <div className={styles.container}>

      <div className={styles.textual}>
        <h1>Exercita Aondi</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatem earum consequuntur nemo
          dolorem nostrum sunt necessitatibus rem. Ab sapiente eius fugit ullam modi nobis amet, delectus at aspernatur officia.</p>
      </div>

      <div className={styles.containerLogIn}>

        <span>Login</span>

        <form className={styles.containerAcesso} onSubmit={handleSubmit(validarLogin)}>
     

          <label htmlFor="emailLogin">Email</label>
          <input
            type="email"
            name="emailLogin"
            placeholder='email@email'
            {...register("email", {
              required: "Email obrigatório",
            })}
          />
          {errors.emailLogin && <p>{errors.emailLogin.message}</p>}

          <label htmlFor="senhaLogin">Senha</label>
          <input
            type="password"
            name="senhaLogin"
            placeholder='senha de pelo menos 6 dígitos'
            {...register("senha", {
              required: "Senha obrigatória",
              minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres" },
            })}
          />
          {errors.senhaLogin && <p>{errors.senhaLogin.message}</p>}

          <button type="submit">LogIn</button>

        </form>

        <span>Não possui conta?</span>
          <button onClick={() => { setMostrarFormulario(true); setMostrarEdicao(false) }}>SignUp</button>
      </div>
      
      <hr />

      <hr />

      {mostrarFormulario && (
        <>
          <h2>Formulário de Cadastro</h2>
          <form className={styles.formlogin} onSubmit={handleSubmit(cadUsuOnsubmit)}>
            <label htmlFor="nome">Nome</label>
            <input type="text"
              placeholder='Nome Sobrenome'
              {...register("nome", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 60, message: "máximo de 60 caracteres" }
              })} />
            {errors.nome && <p>{errors.nome.message}</p>}

            <label htmlFor="sexo">Sexo</label>
            <input type="text"
              placeholder='masculino/feminino'
              {...register("sexo", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 9, message: "máximo de 9 caracteres" }
              })} />
            {errors.sexo && <p>{errors.sexo.message}</p>}

            <label htmlFor="cpf">CPF</label>
            <input type="text"
              placeholder='000000000 - apenas números'
              {...register("cpf", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 9, message: "máximo de 9 caracteres" }
              })} />
            {errors.cpf && <p>{errors.cpf.message}</p>}

            <label htmlFor="nascimento">Nascimento</label>
            <input type="date"
              {...register("nascimento", {
                required: "Obrigatório o preenchimento"
              })} />
            {errors.nascimento && <p>{errors.nascimento.message}</p>}

            <label htmlFor="email">Email</label>
            <input type="email"
              placeholder='email@email.com.br'
              {...register("email", {
                required: "Obrigatório o preenchimento"
              })} />
            {errors.email && <p>{errors.email.message}</p>}

            <label htmlFor="senha">Senha</label>
            <input type="password"

              {...register("senha", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 8, message: "máximo de 8 caracteres" }
              })} />
            {errors.senha && <p>{errors.senha.message}</p>}

            <label htmlFor="cep">CEP</label>
            <input type="text"
              placeholder='00000000 - apenas numeros'
              {...register("cep", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 8, message: "máximo de 8 caracteres" },
                pattern: { value: /^[0-9]*$/, message: 'Apenas números são permitidos' }
              })} />
            {errors.cep && <p>{errors.cep.message}</p>}

            {/* ***********************************************************************
*********************************************************************** */}
            <button type="button" onClick={handleSubmit(cepOnSubmit)}>Buscar CEP</button>

            <label htmlFor="endereco">Endereço</label>
            <input type="text"
              placeholder='teu endereço'
              {...register('endereco', { required: cepPreenchido ? 'Necessário o preenchimento' : false, })} />
            {errors.endereco && <p>{errors.endereco.message}</p>}


            <label htmlFor="bairro">Bairro</label>
            <input type="text"
              placeholder='teu bairro'
              {...register('bairro', { required: cepPreenchido ? 'Necessário o preenchimento' : false, })} />
            {errors.bairro && <p>{errors.bairro.message}</p>}


            <label htmlFor="cidade">Cidade</label>
            <input type="text"
              placeholder='tua cidade'
              {...register('cidade', { required: cepPreenchido ? 'Necessário o preenchimento' : false, })} />
            {errors.cidade && <p>{errors.cidade.message}</p>}

            <label htmlFor="estado">Estado</label>
            <input type="text"
              placeholder='teu estado'
              {...register('estado',
                {
                  required: cepPreenchido ? 'Necessário o preenchimento' : false,
                  maxLength: { value: 2, message: "máximo de 2 caracteres" },
                  minLength: { value: 2, message: 'mínimo de 2 caracteres' },
                })} />
            {errors.estado && <p>{errors.estado.message}</p>}

            <label htmlFor="complemento">Complemento</label>
            <input type="text"
              placeholder='Detalhes diferenciais'
              {...register("complemento", {
                required: cepPreenchido ? 'Necessário o preenchimento' : false,
              })} />
            {errors.complemento && <p>{errors.complemento.message}</p>}

            <label htmlFor="numero">Número</label>
            <input type="text"
              placeholder='teu numero'
              {...register("numero", { required: cepPreenchido ? 'Necessário o preenchimento' : false, })} />
            {errors.numero && <p>{errors.numero.message}</p>}
            <button type='submit'>Cadastro</button>


          </form>
        </>
      )}


      {mostrarEdicao && (
        <>
          <h2>Edição de Cadastro</h2>
          <form className={styles.formlogin} onSubmit={handleSubmit(onsubmit)}>
            <label htmlFor="nome">Nome</label>
            <input type="text"
              placeholder='Nome Sobrenome'
              {...register("nome", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 60, message: "máximo de 60 caracteres" }
              })} />
            {errors.nome && <p>{errors.nome.message}</p>}

            <label htmlFor="sexo">Sexo</label>
            <input type="text"
              placeholder='masculino/feminino'
              {...register("sexo", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 9, message: "máximo de 9 caracteres" }
              })} />
            {errors.sexo && <p>{errors.sexo.message}</p>}

            <label htmlFor="cpf">CPF</label>
            <input type="text"
              placeholder='000000000 - apenas números'
              {...register("cpf", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 9, message: "máximo de 9 caracteres" }
              })} />
            {errors.cpf && <p>{errors.cpf.message}</p>}

            <label htmlFor="nascimento">Nascimento</label>
            <input type="date"
              {...register("nascimento", {
                required: "Obrigatório o preenchimento"
              })} />
            {errors.nascimento && <p>{errors.nascimento.message}</p>}

            <label htmlFor="email">Email</label>
            <input type="email"
              placeholder='email@email.com.br'
              {...register("email", {
                required: "Obrigatório o preenchimento"
              })} />
            {errors.email && <p>{errors.email.message}</p>}

            <label htmlFor="senha">Senha</label>
            <input type="password"

              {...register("senha", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 8, message: "máximo de 8 caracteres" }
              })} />
            {errors.senha && <p>{errors.senha.message}</p>}

            <label htmlFor="cep">CEP</label>
            <input type="text"
              placeholder='00000000 - apenas numeros'
              {...register("cep", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 8, message: "máximo de 8 caracteres" }
              })} />
            {errors.cep && <p>{errors.cep.message}</p>}

            <label htmlFor="endereco">Endereço</label>
            <input type="text"
              placeholder='teu endereço'
              {...register("endereco", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 80, message: "máximo de 80 caracteres" }
              })} />
            {errors.endereco && <p>{errors.endereco.message}</p>}

            <label htmlFor="bairro">Bairro</label>
            <input type="text"
              placeholder='teu bairro'
              {...register("bairro", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 80, message: "máximo de 80 caracteres" }
              })} />
            {errors.bairro && <p>{errors.bairro.message}</p>}

            <label htmlFor="cidade">Cidade</label>
            <input type="text"
              placeholder='tua cidade'
              {...register("cidade", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 80, message: "máximo de 80 caracteres" }
              })} />
            {errors.cidade && <p>{errors.cidade.message}</p>}

            <label htmlFor="estado">Estado</label>
            <input type="text"
              placeholder='teu estado'
              {...register("estado", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 30, message: "máximo de 30 caracteres" }
              })} />
            {errors.estado && <p>{errors.estado.message}</p>}

            <label htmlFor="complemento">Complemento</label>
            <input type="text"
              placeholder='Detalhes diferenciais'
              {...register("complemento", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 30, message: "máximo de 30 caracteres" }
              })} />
            {errors.complemento && <p>{errors.complemento.message}</p>}

            <label htmlFor="numero">Número</label>
            <input type="text"
              placeholder='teu numero'
              {...register("numero", {
                required: "Obrigatório o preenchimento",
                maxLength: { value: 4, message: "máximo de 4 caracteres" }
              })} />
            {errors.numero && <p>{errors.numero.message}</p>}


            <button onClick={() => editarUsuario(novoUsuarioEdicao, setNovousuarioEdicao.id)}>Atualizar</button>

          </form>

        </>
      )}

    </div>
  )


}

export default PaginaLogin;