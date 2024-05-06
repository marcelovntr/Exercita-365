import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';
import { func } from 'prop-types';


function PaginaLista() {

    const { lerLocais, setCadLocal, setMostrarEdicaoLocal, listalocais, apagarLocal } = useContext(UsuariosContext);



    const navigate = useNavigate();

    useEffect(() => {
        lerLocais(); // Carregar locais ao montar a página
    }, []);



    function voltarCadastroLocais(id) {
        setCadLocal(false)
        setMostrarEdicaoLocal(true)
        navigate(`/cadastro/${id}`);
        //guardar o do local
        //faz lerLocaisporId(id) para preencher o formulário com informações do usuario ativo
    }


    return (

        <div className={styles.container}>


            <div className={styles.textual}>

                <h1>Lista de Locais X</h1>
            </div>


            <div className={styles.containerRenderizador}>
                {Array.isArray(listalocais) && listalocais.length > 0 ? (
                    listalocais.map(local => (
                        <div key={local.id}>
                            <h3>Local: {local.nomeLocal}</h3>
                            <p>Descrição: {local.descricaoLocal}</p>
                            <p>local: {local.endereco}</p>
                            <p>Bairro: {local.bairro}</p>
                            <p>Cidade: {local.cidade}</p>
                            <p>Estado: {local.estado}</p>
                            <p>Latitude: {local.latitude}</p>
                            <p>Longitude: {local.longitude}</p>

                            <p>Práticas permitidas: {local.praticasEsportivas.map((praticaX, index) => (
                                <span key={index}>{index == local.praticasEsportivas.length - 1 ? `${" "}${praticaX}.` :
                                    `${" "}${praticaX},`}
                                </span>
                            ))}</p>
                            <button onClick={() => voltarCadastroLocais(local.id)}>Editar</button>
                            <button onClick={() => apagarLocal(local.id)}>Excluir</button>
                        </div>
                    ))
                ) : (
                    <p>Nenhum local disponível</p>
                )}
            </div>
        </div >




    )
}

export default PaginaLista;