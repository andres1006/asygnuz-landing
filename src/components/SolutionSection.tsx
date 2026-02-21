"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./SolutionSection.module.css";

const pillars = [
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
        label: "Pilar 01",
        title: "Arquitectura de Alta Conversión",
        desc: "Desarrollamos Landing Pages en código puro y frameworks modernos. Carga en milisegundos = Mayor retención = Menor costo por lead.",
        metric: "< 1s",
        metricLabel: "Page Load",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
        label: "Pilar 02",
        title: "Automatización de Flujos High-Ticket",
        desc: "Conectamos tus campañas con tu CRM y calendarios. Creamos flujos que actúan como filtro automático y hook perfecto para pre-calificar.",
        metric: "100%",
        metricLabel: "Automatizado",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
        label: "Pilar 03",
        title: "Ecosistema de Datos (Tracking)",
        desc: "Implementamos trazabilidad milimétrica. Sabrás exactamente de dónde viene cada dólar invertido.",
        metric: "1:1",
        metricLabel: "Atribución",
    },
];

export default function SolutionSection() {
    const { ref, isVisible } = useInView();

    return (
        <section className={`section ${styles.solution}`} ref={ref}>
            {/* Background accent */}
            <div className={styles.bgAccent} />

            <div className="container">
                <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
                    <p className="section-pretitle">El Asygnuz Growth System</p>
                    <h2 className="section-title">
                        La diferencia de aplicar Ingeniería a tus Ventas
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        No somos mercadólogos tradicionales. Somos Ingenieros de
                        Crecimiento. Unimos el código duro con la psicología de ventas.
                    </p>
                </div>

                <div className={styles.pillars}>
                    {pillars.map((pillar, i) => (
                        <div
                            key={i}
                            className={`${styles.pillarCard} ${isVisible ? styles.visible : ""}`}
                            style={{ transitionDelay: `${0.2 * (i + 1)}s` }}
                        >
                            <div className={styles.pillarTop}>
                                <span className={styles.pillarLabel}>{pillar.label}</span>
                                <div className={styles.pillarIcon}>{pillar.icon}</div>
                            </div>
                            <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                            <p className={styles.pillarDesc}>{pillar.desc}</p>
                            <div className={styles.metricBlock}>
                                <span className={styles.metricValue}>{pillar.metric}</span>
                                <span className={styles.metricLabel}>{pillar.metricLabel}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
