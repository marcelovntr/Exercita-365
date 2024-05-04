import styles from "./index.module.css"
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className={styles.header}>
            <h4>Fitness PlaceX</h4>
            <nav className={styles.nav}>

                {/* <Link to="/login" className={styles.link}>Login/Cadastro</Link> */}

                <Link to="/" className={styles.link}>DashBoard</Link>

                <Link to="/lista" className={styles.link}>Encontrar Locais</Link>

                <Link to="/cadastro" className={styles.link}>Cadastrar Locais</Link>
            </nav>
        </header>
    );
}


export default Header;