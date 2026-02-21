"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const scrollToForm = () => {
        document.getElementById("aplicar")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className={styles.hero}>
            {/* Animated background grid */}
            <div className={styles.gridBg}>
                <div className={styles.gridLines} />
            </div>

            {/* Glow orbs */}
            <div className={styles.orbCyan} />
            <div className={styles.orbNavy} />

            <div className={`container ${styles.content}`}>
                {/* Logo */}
                <div className={`${styles.logo} ${loaded ? styles.visible : ""}`}>
                    <Image
                        src="/logos/AsygnuzLogo1-010.png"
                        alt="Asygnuz Ingeniería"
                        width={180}
                        height={80}
                        priority
                        style={{ filter: "invert(1)", objectFit: "contain" }}
                    />
                </div>

                {/* Pre-title filter */}
                <p className={`${styles.pretitle} ${loaded ? styles.visible : ""}`}>
                    Exclusivo para empresas B2B, Clínicas de Alta Especialidad y Creadores
                    High-Ticket
                </p>

                {/* H1 */}
                <h1 className={`${styles.title} ${loaded ? styles.visible : ""}`}>
                    Tu marketing genera clics.
                    <br />
                    <span className={styles.highlight}>
                        Nuestra ingeniería genera clientes recurrentes.
                    </span>
                </h1>

                {/* H2 */}
                <p className={`${styles.subtitle} ${loaded ? styles.visible : ""}`}>
                    Deja de perder dinero por culpa de embudos lentos y seguimientos
                    manuales. Construimos e implementamos la{" "}
                    <strong>Infraestructura de Adquisición</strong> que tu negocio necesita
                    para escalar de forma predecible.
                </p>

                {/* CTA */}
                <div className={`${styles.ctaWrapper} ${loaded ? styles.visible : ""}`}>
                    <button className="cta-button" onClick={scrollToForm}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 2L11 13" />
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                        </svg>
                        Aplicar para una Auditoría de Escalabilidad
                    </button>
                </div>

                {/* Trust badge */}
                <div className={`${styles.trustBadge} ${loaded ? styles.visible : ""}`}>
                    <div className={styles.trustDot} />
                    <span>Cupos limitados · Solo 4 clientes nuevos al mes</span>
                </div>
            </div>
        </section>
    );
}
