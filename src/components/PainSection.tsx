"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./PainSection.module.css";

const pains = [
    {
        title: "Wasted Ad Spend",
        desc: "Tu presupuesto de marketing se evapora en campañas que no escalan, no convierten y carecen de inteligencia predictiva. ¿Mides el impacto o solo gastas?",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        )
    },
    {
        title: "Crecimiento Errático",
        desc: "Dependes de golpes de suerte o tendencias. Sin una infraestructura que garantice un flujo constante de leads de alto valor, tu expansión es una quimera.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
        )
    },
    {
        title: "Parálisis por Datos",
        desc: "Te ahogas en silos de información o careces de los datos correctos para tomar decisiones estratégicas. Tu capacidad de innovar se estanca.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        )
    },
    {
        title: "Complejidad Inmanejable",
        desc: "Tu pila tecnológica es un Frankenstein de herramientas desconectadas, creando fricciones internas y limitando tu agilidad competitiva.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
            </svg>
        )
    }
];

export default function PainSection() {
    const { ref, isVisible } = useInView();

    return (
        <section className={styles.pain} ref={ref}>
            {/* Fondo radial rojo */}
            <div className={styles.bgOverlay}></div>

            <div className={styles.inner}>
                {/* Header */}
                <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
                    <p className={styles.pretitle}>
                        <span className={styles.pretitleLine}></span>
                        El Problema Real
                        <span className={styles.pretitleLine}></span>
                    </p>
                    <h2 className={styles.title}>
                        Tu Competencia No Espera.<br />
                        <span className={styles.titleAccent}>¿Por Qué Deberías Tú?</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Deja de perder millones en estrategias obsoletas. La infraestructura de marketing tradicional es un lastre. Necesitas un <strong>motor</strong>, no una colección de parches.
                    </p>
                </div>

                {/* Grid de dolores */}
                <div className={styles.grid}>
                    {pains.map((pain, i) => (
                        <div
                            key={i}
                            className={`${styles.card} ${isVisible ? styles.visible : ''}`}
                            style={{ transitionDelay: `${i * 0.15}s` }}
                        >
                            <div className={styles.iconWrapper}>
                                {pain.icon}
                                <div className={styles.xBadge}>✕</div>
                            </div>
                            <h3 className={styles.cardTitle}>{pain.title}</h3>
                            <p className={styles.cardDesc}>{pain.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className={`${styles.footer} ${isVisible ? styles.footerVisible : ''}`}>
                    <p>La diferencia entre liderar y seguir radica en tu capacidad de <strong>ingeniería</strong>.</p>
                </div>
            </div>
        </section>
    );
}
