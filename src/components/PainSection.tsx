"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./PainSection.module.css";

const pains = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        title: "Fugas de capital en pauta",
        desc: "Tienes tráfico, pero tu landing page no retiene la atención y las conversiones son bajísimas.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
        title: "Caos operativo",
        desc: "Tu equipo comercial pierde horas filtrando prospectos no cualificados manualmente.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /><line x1="1" y1="1" x2="23" y2="23" />
            </svg>
        ),
        title: "Data ciega",
        desc: "No sabes con exactitud qué anuncio generó qué cliente porque tu tracking (píxeles/API) está mal configurado.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        title: "Tecnología obsoleta",
        desc: "Tu sitio se cae cuando hay picos de tráfico o carga tan lento que Google te penaliza.",
    },
];

export default function PainSection() {
    const { ref, isVisible } = useInView();

    return (
        <section className={`section ${styles.pain}`} ref={ref}>
            <div className="container">
                <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
                    <p className="section-pretitle">El Diagnóstico</p>
                    <h2 className="section-title">
                        ¿Tu negocio sufre de alguno de estos cuellos de botella?
                    </h2>
                </div>

                <div className={styles.grid}>
                    {pains.map((pain, i) => (
                        <div
                            key={i}
                            className={`${styles.card} ${isVisible ? styles.visible : ""}`}
                            style={{ transitionDelay: `${0.15 * (i + 1)}s` }}
                        >
                            <div className={styles.iconWrapper}>
                                <div className={styles.xBadge}>✕</div>
                                {pain.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{pain.title}</h3>
                            <p className={styles.cardDesc}>{pain.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
