"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./SolutionSection.module.css";

const pillars = [
    {
        title: "Software Core",
        desc: "Plataformas, SaaS e integraciones complejas. Arquitectura robusta, escalable y enfocada en conversiones ultrarrápidas.",
        label: "Infraestructura",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
            </svg>
        ),
        metricValue: "99.9%",
        metricLabel: "Uptime"
    },
    {
        title: "Autonomous AI",
        desc: "Agentes de Inteligencia Artificial operativos 24/7. Automatización de flujos y atención pre-calificada sin intervención humana.",
        label: "Agentes",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                <rect x="2" y="10" width="20" height="10" rx="2" ry="2"/>
                <path d="M12 10V4c0-1.1-.9-2-2-2H4"/>
                <circle cx="12" cy="14" r="2"/>
            </svg>
        ),
        metricValue: "24/7",
        metricLabel: "Operación"
    },
    {
        title: "Growth & MarTech",
        desc: "Adquisición técnica de alto rendimiento, optimización de conversión (CRO) y orquestación de datos y píxeles.",
        label: "Adquisición",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
        ),
        metricValue: "+300%",
        metricLabel: "Conversión"
    }
];

export default function SolutionSection() {
    const { ref, isVisible } = useInView();

    return (
        <section className={`py-24 relative border-t border-gray-800 ${styles.solution}`} ref={ref}>
            <div className={styles.bgAccent}></div>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display tracking-tight">
                        El <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Asygnuz</span> Growth System
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                        Nuestra metodología patentada fusiona el desarrollo web de alta performance con ingeniería de adquisición y automatización con IA.
                    </p>
                </div>

                <div className={styles.pillars}>
                    {pillars.map((pillar, i) => (
                        <div 
                            key={i} 
                            className={`${styles.pillarCard} ${isVisible ? styles.visible : ''}`}
                            style={{ transitionDelay: `${i * 0.15}s` }}
                        >
                            <div className={styles.pillarTop}>
                                <div className={styles.pillarIcon}>
                                    {pillar.icon}
                                </div>
                                <div className={styles.pillarLabel}>
                                    {pillar.label}
                                </div>
                            </div>
                            
                            <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                            <p className={styles.pillarDesc}>{pillar.desc}</p>
                            
                            <div className={styles.metricBlock}>
                                <span className={styles.metricValue}>{pillar.metricValue}</span>
                                <span className={styles.metricLabel}>{pillar.metricLabel}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}