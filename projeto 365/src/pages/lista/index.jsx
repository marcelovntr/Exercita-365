import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"


function PaginaLista(){

    const { usuarios, cadastrarUsuario, editarUsuario, apagarUsuario, lerUsuariosPorId } = useContext(UsuariosContext);



    return(
        <div className={styles.container}>
        <h1>Lista de Locais</h1>
        </div>
    )
}

export default PaginaLista;