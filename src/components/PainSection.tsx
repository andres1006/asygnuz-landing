"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./PainSection.module.css";

const pains = [
    {
        title: "Wasted Ad Spend",
        desc: "Tu presupuesto de marketing se evapora en campañas que no escalan, no convierten y carecen de inteligencia predictiva. ¿Mides el impacto o solo gastas?",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
        )
    },
    {
        title: "Crecimiento Errático",
        desc: "Dependes de golpes de suerte o tendencias. Sin una infraestructura que garantice un flujo constante de leads de alto valor, tu expansión es una quimera.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
        )
    },
    {
        title: "Parálisis por Datos",
        desc: "Te ahogas en silos de información o careces de los datos correctos para tomar decisiones estratégicas. Tu capacidad de innovar se estanca.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
        )
    },
    {
        title: "Complejidad Inmanejable",
        desc: "Tu pila tecnológica es un Frankenstein de herramientas desconectadas, creando fricciones internas y limitando tu agilidad.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
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
        <section className={`py-32 relative border-t border-gray-800 ${styles.pain}`} ref={ref}>
            {/* Dark background overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className={`${styles.header} ${isVisible ? styles.visible : ''} max-w-4xl mx-auto`}>
                    <p className="text-red-500 font-mono text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
                        <span className="w-8 h-px bg-red-500/50"></span>
                        El Problema Real
                        <span className="w-8 h-px bg-red-500/50"></span>
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white font-display tracking-tight leading-tight">
                        Tu Competencia No Espera. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">¿Por Qué Deberías Tú?</span>
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Deja de perder millones en estrategias de crecimiento obsoletas. La infraestructura de marketing tradicional es un lastre. Necesitas un motor, no una colección de parches.
                    </p>
                </div>

                <div className={styles.grid}>
                    {pains.map((pain, i) => (
                        <div 
                            key={i} 
                            className={`${styles.card} ${isVisible ? styles.visible : ''}`}
                            style={{ transitionDelay: `${i * 0.15}s` }}
                        >
                            <div className={styles.iconWrapper}>
                                {pain.icon}
                                <div className={styles.xBadge}>X</div>
                            </div>
                            <h3 className={styles.cardTitle}>{pain.title}</h3>
                            <p className={styles.cardDesc}>{pain.desc}</p>
                        </div>
                    ))}
                </div>

                <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-lg text-gray-500 font-medium">La diferencia entre ser un líder y ser un seguidor radica en tu capacidad de <strong className="text-white">ingeniería</strong>.</p>
                </div>
            </div>
        </section>
    );
}