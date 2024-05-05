import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';

function PaginaLista() {

    const { lerLocais, setCadLocal, setMostrarEdicaoLocal, listalocais } = useContext(UsuariosContext);

    const navigate = useNavigate();

    useEffect(() => {
        lerLocais(); // Carregar locais ao montar a página
    }, []);



    function voltarCadastroLocais() {
        setCadLocal(false)
        setMostrarEdicaoLocal(true)
        navigate(`/cadastro/${id}`);
        //guardar o do local
        //faz lerLocaisporId(id) para preencher o formulário com informações do usuario ativo


        return (
            <>
                <div className={styles.container}>
                    <h1>Lista de Locais</h1>
                </div>

                {Array.isArray(listalocais) && listalocais.length > 0 ? (
                listalocais.map(local => (
                    <div key={local.id}>
                        <h3>{local.nomeLocal}</h3>
                        <p>{local.descricaoLocal}</p>
                        <p>{local.praticasEsportivas}</p>
                        <button onClick={() => voltarCadastroLocais(local.idCadastrante)}>Editar</button>
                        <button>Excluir</button>
                    </div>
                ))
            ) : (
                <p>Nenhum local disponível</p>
            )}

            </>
        )
    }
}

    export default PaginaLista;