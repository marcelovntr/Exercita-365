import { useContext } from "react";
import styles from "./index.module.css"
import { Link } from "react-router-dom";
import { UsuariosContext } from "../../context/UsuariosContext";

function Header() {
    const {sair} = useContext(UsuariosContext);


    return (
        <header className={styles.header}>
            <h4>Fitness PlaceX</h4>
            <nav className={styles.nav}>

                {/* <Link to="/login" className={styles.link}>Login/Cadastro</Link> */}

                <Link to="/" className={styles.link}>DashBoard</Link>

                <Link to="/lista" className={styles.link}>Encontrar Locais</Link>

                <Link to="/cadastro" className={styles.link}>Cadastrar Locais</Link>
            </nav>
            <button className={styles.butao} onClick={sair}>Log Out</button>
        </header>
    );
}

export default Header