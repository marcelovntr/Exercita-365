import styles from "./index.module.css"


function Footer(){
    return(
        <footer className={styles.footer}>
        <span className={styles.esquerda}>Fitness PlaceX

        </span>
        <span className={styles.direita}>
            <a href="https://github.com/" target="blank"><img src="../githubiconsmall.png" alt="icone github" /></a>
            <a href="https://br.linkedin.com" target="blank"><img src="../linkediniconsmall.png" alt="icone linkedin" /></a>
            <a href="https://www.instagram.com/" target="blank"><img src="../instagramiconsmall.png" alt="icone instagram" /></a>
        </span>
    </footer>
    )
}

export default Footer