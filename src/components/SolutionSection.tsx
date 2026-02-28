"use client";

import { motion, Variants } from "framer-motion";
import styles from "./SolutionSection.module.css";

const pillars = [
    {
        title: "Software Core",
        desc: "Plataformas, SaaS e integraciones complejas. Arquitectura robusta, escalable y enfocada en conversiones ultrarrápidas.",
        label: "Infraestructura",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
            </svg>
        ),
        metricValue: "99.9%",
        metricLabel: "Uptime",
        accent: "cyan"
    },
    {
        title: "Autonomous AI",
        desc: "Agentes de Inteligencia Artificial operativos 24/7. Automatización de flujos y atención pre-calificada sin intervención humana.",
        label: "Agentes",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="10" width="20" height="10" rx="2" ry="2"/>
                <path d="M12 10V4c0-1.1-.9-2-2-2H4"/>
                <circle cx="12" cy="14" r="2"/>
            </svg>
        ),
        metricValue: "24/7",
        metricLabel: "Operación",
        accent: "emerald"
    },
    {
        title: "Growth & MarTech",
        desc: "Adquisición técnica de alto rendimiento, optimización de conversión (CRO) y orquestación de datos y píxeles.",
        label: "Adquisición",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
        ),
        metricValue: "+300%",
        metricLabel: "Conversión",
        accent: "purple"
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { type: "spring", stiffness: 80, damping: 20 } 
    }
};

export default function SolutionSection() {
    return (
        <section className={styles.solution}>
            <div className={styles.bgAccent}></div>
            <div className={styles.topLine}></div>

            <div className={styles.inner}>
                {/* Header */}
                <motion.div 
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className={styles.pretitle}>
                        <span className={styles.pretitleLine}></span>
                        Growth System
                        <span className={styles.pretitleLine}></span>
                    </p>
                    <h2 className={styles.title}>
                        El <span className={styles.titleAccent}>Asygnuz</span> Growth System
                    </h2>
                    <p className={styles.subtitle}>
                        Nuestra metodología fusiona desarrollo web de alta performance con ingeniería de adquisición y automatización con IA.
                    </p>
                </motion.div>

                {/* Pillars */}
                <motion.div 
                    className={styles.pillars}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {pillars.map((pillar) => (
                        <motion.div
                            key={pillar.title}
                            className={`${styles.pillarCard} ${styles[`accent_${pillar.accent}`]}`}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                        >
                            <div className={styles.pillarTop}>
                                <div className={`${styles.pillarIcon} ${styles[`icon_${pillar.accent}`]}`}>
                                    {pillar.icon}
                                </div>
                                <div className={styles.pillarLabel}>{pillar.label}</div>
                            </div>
                            <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                            <p className={styles.pillarDesc}>{pillar.desc}</p>
                            <div className={styles.metricBlock}>
                                <span className={`${styles.metricValue} ${styles[`metric_${pillar.accent}`]}`}>{pillar.metricValue}</span>
                                <span className={styles.metricLabel}>{pillar.metricLabel}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}