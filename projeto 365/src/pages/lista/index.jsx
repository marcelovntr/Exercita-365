import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';

function PaginaLista() {

    const { usuarios, cadastrarUsuario, editarUsuario, apagarUsuario, lerUsuariosPorId,
        mostrarCadLocal, setCadLocal, mostrarEdicaoLocal, setMostrarEdicaoLocal
    } = useContext(UsuariosContext);

    const navigate = useNavigate();



    function voltarCadastroLocais() {
        setCadLocal(false)
        setMostrarEdicaoLocal(true)
        navigate('/cadastro');
        //guardar o do local
        //faz lerLocaisporId(id) para preencher o formulário com informações do usuario ativo


        return (
            <>
                <div className={styles.container}>
                    <h1>Lista de Locais</h1>
                </div>

                <button onClick={voltarCadastroLocais}>Editar</button>
                <button>Excluir</button>

            </>
        )
    }
}

    export default PaginaLista;