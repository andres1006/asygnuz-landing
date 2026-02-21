"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./FilterSection.module.css";

const yesItems = [
    "Negocios que venden servicios o productos High-Ticket (B2B, Salud, Infoproductos premium).",
    "Empresas que ya invierten en publicidad y quieren optimizar su ROAS (Retorno de Inversión).",
    "Líderes que entienden que el crecimiento requiere inversión en tecnología y procesos.",
];

const noItems = [
    'Estás buscando solo "alguien que te suba posts a Instagram".',
    "Tu negocio apenas es una idea y no tienes validado tu producto.",
    "Buscas soluciones mágicas o plantillas baratas en lugar de activos digitales reales.",
];

export default function FilterSection() {
    const { ref, isVisible } = useInView();

    return (
        <section className={`section ${styles.filter}`} ref={ref}>
            <div className="container">
                <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
                    <p className="section-pretitle">Transparencia total</p>
                    <h2 className="section-title">
                        ¿Para quién es esta infraestructura?
                    </h2>
                </div>

                <div className={styles.columns}>
                    {/* YES column */}
                    <div
                        className={`${styles.column} ${styles.columnYes} ${isVisible ? styles.visible : ""}`}
                        style={{ transitionDelay: "0.2s" }}
                    >
                        <div className={styles.columnHeader}>
                            <div className={styles.checkIcon}>✓</div>
                            <h3 className={styles.columnTitle}>Sí eres para nosotros</h3>
                        </div>
                        <ul className={styles.list}>
                            {yesItems.map((item, i) => (
                                <li key={i} className={styles.listItem}>
                                    <span className={styles.checkMark}>✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* NO column */}
                    <div
                        className={`${styles.column} ${styles.columnNo} ${isVisible ? styles.visible : ""}`}
                        style={{ transitionDelay: "0.35s" }}
                    >
                        <div className={styles.columnHeader}>
                            <div className={styles.xIcon}>✕</div>
                            <h3 className={styles.columnTitle}>NO apliques si...</h3>
                        </div>
                        <ul className={styles.list}>
                            {noItems.map((item, i) => (
                                <li key={i} className={styles.listItem}>
                                    <span className={styles.crossMark}>✕</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
