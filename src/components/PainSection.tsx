"use client";

import { motion, Variants } from "framer-motion";
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

const gridVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.13, delayChildren: 0.15 }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 48, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
};

// Animates each word of a heading on scroll
function SplitHeading({ children, className }: { children: string; className?: string }) {
    const words = children.split(" ");
    return (
        <motion.span
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

export default function PainSection() {
    return (
        <section className={styles.pain}>
            <div className={styles.bgOverlay} />

            <div className={styles.inner}>
                {/* Header */}
                <div className={styles.header}>
                    <motion.p
                        className={styles.pretitle}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <span className={styles.pretitleLine} />
                        El Problema Real
                        <span className={styles.pretitleLine} />
                    </motion.p>

                    <h2 className={styles.title}>
                        <span className="block">
                            <SplitHeading>Tu Competencia No Espera.</SplitHeading>
                        </span>
                        <span className={`block ${styles.titleAccent}`}>
                            <SplitHeading>¿Por Qué Deberías Tú?</SplitHeading>
                        </span>
                    </h2>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Deja de perder millones en estrategias obsoletas. La infraestructura de marketing
                        tradicional es un lastre. Necesitas un <strong>motor</strong>, no una colección de parches.
                    </motion.p>
                </div>

                {/* Cards grid */}
                <motion.div
                    className={styles.grid}
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {pains.map((pain) => (
                        <motion.div
                            key={pain.title}
                            className={styles.card}
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        >
                            <div className={styles.iconWrapper}>
                                {pain.icon}
                                <div className={styles.xBadge}>✕</div>
                            </div>
                            <h3 className={styles.cardTitle}>{pain.title}</h3>
                            <p className={styles.cardDesc}>{pain.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer line */}
                <motion.div
                    className={styles.footer}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                >
                    <p>La diferencia entre liderar y seguir radica en tu capacidad de <strong>ingeniería</strong>.</p>
                </motion.div>
            </div>
        </section>
    );
}
