import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';


function DashBoard() {

    const { usuario, usuarios, setUsuarios, cadastrarUsuario, listalocais, setListaLocais, editarUsuario,
        apagarUsuario, lerUsuariosPorId, mostrarEdicao, setMostrarEdicao, setMostrarFormulario, lerUsuarios } = useContext(UsuariosContext);


    useEffect(() => {
        lerLocais(); // Carregar locais ao montar a página
        lerUsuarios()
    }, []);

    const navigate = useNavigate();



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


                    <h4>usuários do sexo masculino:
                        {!!usuarios && usuarios.filter(usuario => usuario.sexo === 'masculino').length
                        }</h4>
                    <h4>usuários do sexo feminino:
                        {!!usuarios && usuarios.filter(usuario => usuario.sexo === 'feminino').length
                        }</h4>


                </div>

                <div className={styles.containerlocais}>
                    <h1>Informações de Locais</h1>
                    <h2>tamanho array de listaLocais: {listalocais.length}</h2>


                    <h4>Trilhas cadastradas: {listalocais.length}</h4>
                    <h4>Cadastradores:</h4>


                    <h4>Total de cadastradores únicos:
                        {!!Array.isArray(listalocais) && listalocais.length > 0 && listalocais
                            .filter((local, index, self) =>
                                self.findIndex((total) => total.idCadastrante === local.idCadastrante) === index
                            ).length
                        }</h4>

                    <h4>Cidades com locais cadastrados:
                        {!!Array.isArray(listalocais) && listalocais.length > 0 && (
                            <ul>
                                {listalocais.filter((local, index, self) =>
                                    self.findIndex((total) => total.cidade === local.cidade) === index)
                                    .map((local, index) => (
                                        <li key={index}> {local.cidade}</li>
                                    ))}
                            </ul>
                        )}
                    </h4>

                </div>
            </div>
            <button onClick={() => voltarParaCadastro()}>Editar Cadastro</button>
            


        </div>
    )
}

export default DashBoard;