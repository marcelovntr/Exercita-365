import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';


function DashBoard() {

    const { usuario, usuarios, setUsuarios, cadastrarUsuario, listalocais, setListaLocais, editarUsuario,
        apagarUsuario, lerUsuariosPorId, mostrarEdicao, setMostrarEdicao, setMostrarFormulario } = useContext(UsuariosContext);


    useEffect(() => {
        lerLocais(); // Carregar locais ao montar a página
        lerUsuarios()
    }, []);

    const navigate = useNavigate();

    function contarUsuariosPorEstado() {
        const usuariosPorEstado = {};

        for (let estado of ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
            'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']) {
            usuariosPorEstado[estado] = 0;
        }

        for (let usuario of usuarios) {
            usuariosPorEstado[usuario.estado]++;
        }
        return usuariosPorEstado;
    }
    const usuariosPorEstado = contarUsuariosPorEstado();


    function voltarParaCadastro() {
        setMostrarFormulario(false)
        setMostrarEdicao(true)
        navigate('/login');
        //guardar o id do usuario ativo
        //faz lerUsuariosPorId(id) para preencher o formulário com informações do usuario ativo

    }



    return (
        <div className={styles.container}>
            <h1>Pagina do DashBoard</h1>

            <div className={styles.containerinterno}>

                <div className={styles.containerusuarios}>
                    <h1>Informações de Usuários</h1>
                    <h2>tamanho array de usuarios: {usuarios.length}</h2>

                    <h2>Contagem de usuários por estado:</h2>
                    <div>
                        {Object.entries(usuariosPorEstado).map(([estado, quantidade]) => (
                            quantidade > 0 &&
                            <p key={estado}>{estado}: {quantidade}</p>
                        ))}
                    </div>

                    <h4>usuários do sexo masculino:
                        {!!usuarios && usuarios.filter(usuario => usuario.sexo === 'masculino').length
                        }</h4>
                    <h4>usuários do sexo feminino:
                        {!!usuarios && usuarios.filter(usuario => usuario.sexo === 'feminino').length
                        }</h4>

                    {!!usuarios && usuarios.map(usuario => (

                        <div key={usuario.id}>
                            <h3> {usuario.nome}</h3>
                            <h4>{usuario.email}</h4>

                            <button onClick={() => apagarUsuario(usuario.id)}>IR DE BASE</button>

                        </div >

                    ))}

                    <h1>usuários NÃO!!!! logados:</h1>
                    <h2>Quantidade de !logado: {usuarios.filter(online => !online.logado).length}</h2>

                    {!!usuarios && usuarios.filter(user => !user.logado).map(user => (

                        <div key={user.id}>
                            <h3>{user.nome}</h3>
                            <h3>{user.email}</h3>

                        </div>

                    ))}
                </div>

                <div className={styles.containerlocais}>
                    <h1>Informações de Locais</h1>
                    <h2>tamanho array de listaLocais: {listalocais.length}</h2>
                    {Array.isArray(listalocais) && listalocais.length > 0 ? (
                        listalocais.map(local => (
                            <div key={local.id}>
                                <h3>{local.nomeLocal}</h3>
                                <p>{local.descricaoLocal}</p>
                                <p>{local.praticasEsportivas}</p>

                            </div>
                        ))
                    ) : (
                        <p>Nenhum local disponível</p>
                    )}

                    <h4>Trilhas cadastradas: {listalocais.length}</h4>
                    <h4>Cadastradores:</h4>

                    {Array.isArray(listalocais) && listalocais.length > 0 ? (
                        listalocais.map(cadastrou => (
                            <div key={cadastrou.id}>
                                <p>{cadastrou.idCadastrante}</p>

                            </div>

                        ))) : (
                        <p>Nenhum local disponível</p>
                    )}

                    <h4>Total de cadastradores únicos:
                    {!!Array.isArray(listalocais) && listalocais.length > 0 && listalocais
                            .filter((local, index, self) =>
                                self.findIndex((total) => total.idCadastrante === local.idCadastrante) === index
                            ).length
                        }</h4>

                </div>
            </div>
            <button onClick={() => voltarParaCadastro()}>Editar Cadastro</button>
            <button onClick={() => apagarUsuario(usuario.id)}>Excluir Cadastro</button>


        </div>
    )
}

export default DashBoard;