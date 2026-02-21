import Image from "next/image";
import styles from "./FooterSection.module.css";

export default function FooterSection() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <Image
                            src="/logos/AsygnuzLogo1-010.png"
                            alt="Asygnuz"
                            width={120}
                            height={50}
                            style={{ filter: "invert(1)", objectFit: "contain" }}
                        />
                        <p className={styles.tagline}>
                            Ingeniería de Crecimiento para empresas que quieren escalar.
                        </p>
                    </div>
                    <div className={styles.legal}>
                        <p>© {new Date().getFullYear()} Asygnuz Ingeniería. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
