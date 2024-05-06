import styles from "./index.module.css"


function CardLista({ listalocais }) {

    if (!listalocais) {
        return null; // ou renderizar uma mensagem de erro ou carregamento
    }

    return (
        <div className={styles.cardcontainer}>

            <div className={styles.topo}>
                <h3>{listalocais.nomeLocal}</h3>
                <p><span></span>{listalocais.descricaoLocal}</p>
            </div>
            <div className={styles.endereco}>
                <p><span>Endereço: </span>{listalocais.endereco}</p>
                <p><span>Bairro: </span>{listalocais.bairro}</p>
                <p><span>Cidade: </span>{listalocais.cidade}</p>
                <p><span>Estado: </span>{listalocais.estado}</p>

            </div>
            <div className={styles.latLong}>
                <p><span>Coordenadas: </span>{listalocais.latitude} / {listalocais.longitude}</p>
            </div>

            <div className={styles.praticas}>
                <p>Práticas permitidas: {listalocais.praticasEsportivas.map((praticaX, index) => (
                    <span key={index}>{index == listalocais.praticasEsportivas.length - 1 ? `${" "}${praticaX}.` :
                        `${" "}${praticaX},`}
                    </span>
                ))}</p>
            </div>

        </div>
    )


}

export default CardLista