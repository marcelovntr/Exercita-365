import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';
import CardLista from '../../components/CardLista';


function DashBoard() {

    const { lerUsuarios, lerLocais, usuarios, setUsuarios, cadastrarUsuario, listalocais, setListaLocais,
        editarUsuario, lerUsuariosPorId, mostrarEdicao, setMostrarEdicao, setMostrarFormulario } = useContext(UsuariosContext);


    useEffect(() => {
        lerLocais(); // Carregar locais ao montar a página
        lerUsuarios()
    }, []);


    const navigate = useNavigate();

    // function contarUsuariosPorEstado() {
    //     const usuariosPorEstado = {};

    //     for (let estado of ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    //         'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']) {
    //         usuariosPorEstado[estado] = 0;
    //     }
    //     for (let usuario of usuarios) {
    //         usuariosPorEstado[usuario.estado]++;
    //     }
    //     return usuariosPorEstado;
    // }
    // const usuariosPorEstado = contarUsuariosPorEstado();



    function voltarParaCadastro() {
        setMostrarFormulario(false)
        setMostrarEdicao(true)
        navigate('/login');
        //guardar o id do usuario ativo
        //faz lerUsuariosPorId(id) para preencher o formulário com informações do usuario ativo
    }



    return (
        <div className={styles.container}>


            <div className={styles.textual}>

                <h1>DashBoard</h1>
            </div>


            <div className={styles.containerinterno}>

                <div className={styles.containerusuarios}>
                    <h3>Informações de Usuários</h3>
                    <p>Usuários cadastrados: {usuarios.length}</p>



                    {/* <h2>Contagem de usuários por estado:</h2>
                    <div>
                        {Object.entries(usuariosPorEstado).map(([estado, quantidade]) => (
                            quantidade > 0 &&
                            <p key={estado}>{estado}: {quantidade}</p>
                        ))}
                    </div> */}

                    <p>usuários do sexo masculino:
                        {!!usuarios && usuarios.filter(usuario => usuario.sexo === 'masculino').length
                        }</p>
                    <p>usuários do sexo feminino:
                        {!!usuarios && usuarios.filter(usuario => usuario.sexo === 'feminino').length
                        }</p>

                    {/* {!!usuarios && usuarios.map(usuario => (

                        <div key={usuario.id}>
                            <h3> {usuario.nome}</h3>
                            <h4>{usuario.email}</h4>

                        </div >

                    ))} */}

                    {/* <h1>usuários NÃO!!!! logados:</h1>
                    <h2>Quantidade de !logado: {usuarios.filter(online => !online.logado).length}</h2>

                    {!!usuarios && usuarios.filter(user => !user.logado).map(user => (

                        <div key={user.id}>
                            <h3>{user.nome}</h3>
                            <h3>{user.email}</h3>

                        </div>

                    ))} */}
                </div>

                <div className={styles.containerlocais}>
                    <h3>Informações de Locais</h3>
                    <p>Locais cadastrados: {listalocais.length}</p>

                    {/* <h4>Cadastradores:</h4>

                    {Array.isArray(listalocais) && listalocais.length > 0 ? (
                        listalocais.map(cadastrou => (
                            <div key={cadastrou.id}>
                                <p>{cadastrou.idCadastrante}</p>

                            </div>

                        ))) : (
                        <p>Nenhum local disponível</p>
                    )} */}

                    <p>Cadastradores colaboradores:
                        {!!Array.isArray(listalocais) && listalocais.length > 0 && listalocais
                            .filter((local, index, self) =>
                                self.findIndex((total) => total.idCadastrante === local.idCadastrante) === index
                            ).length
                        }</p>


                    <p>Cidades com locais cadastrados:
                        {!!Array.isArray(listalocais) && listalocais.length > 0 && (
                            <ul>
                                {listalocais.filter((local, index, self) =>
                                    self.findIndex((total) => total.cidade === local.cidade) === index)
                                    .map((local, index) => (
                                        <li key={index}> {local.cidade}</li>
                                    ))}
                            </ul>
                        )}
                    </p>

                </div>
            </div>

            <div className={styles.containerCard}>
                {Array.isArray(listalocais)
                    && listalocais.map((lista, index) => (
                        <CardLista listalocais={lista} key={index} />
                    ))
                }
            </div>
            <button onClick={() => voltarParaCadastro()}>Editar Cadastro</button>
            {/* <button onClick={() => apagarUsuario(usuario.id)}>Excluir Cadastro</button> */}


        </div >
    )
}

export default DashBoard;