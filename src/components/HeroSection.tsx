"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import styles from "./HeroSection.module.css";
import { useLeadModal } from "@/context/LeadModalContext";

// Splits text into word spans that animate individually
function AnimatedWords({
    text,
    className,
    delay = 0,
    highlight,
}: {
    text: string;
    className?: string;
    delay?: number;
    highlight?: string;
}) {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.55,
                        delay: delay + i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                    {highlight && word.replace(/\./g, "") === highlight.replace(/\./g, "") ? (
                        <span className={styles.highlight}>{word}</span>
                    ) : word}
                </motion.span>
            ))}
        </span>
    );
}

export default function HeroSection() {
    const { openModal } = useLeadModal();
    const containerRef = useRef<HTMLElement>(null);

    const line1 = "No somos una agencia.";
    const line2 = "Somos tu infraestructura de Growth Engineering.";

    return (
        <section className={`${styles.hero} relative w-full overflow-hidden`} ref={containerRef}>
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-white">
                <div className={styles.gridBg}>
                    <div className={styles.gridLines} />
                </div>
                <div className={styles.orbCyan} />
                <div className={styles.orbNavy} />
            </div>

            <div className={`container mx-auto px-6 relative z-10 flex flex-col items-center justify-center ${styles.content}`}>

                {/* Logo */}
                <motion.div
                    className={styles.logo}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Image
                        src="/logos/AsygnuzLogo1-010.png"
                        alt="Asygnuz"
                        width={460}
                        height={70}
                        className="opacity-90"
                        priority
                    />
                </motion.div>

                {/* Kicker */}
                <motion.div
                    className={styles.pretitle}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                    INGENIERÍA APLICADA A LAS VENTAS
                </motion.div>

                {/* H1 — word by word */}
                <h1 className={styles.title} style={{ textAlign: "center" }}>
                    <span className="block">
                        <AnimatedWords text={line1} delay={0.35} />
                    </span>
                    <span className="block">
                        <AnimatedWords text={line2} delay={0.5} highlight="Engineering." />
                    </span>
                </h1>

                {/* Subtitle — phrase stagger */}
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    Integramos <strong>Desarrollo de Software</strong>,{" "}
                    <strong>Agentes de Inteligencia Artificial</strong> y{" "}
                    <strong>Performance Marketing</strong> para crear sistemas de ventas
                    inquebrantables. Para empresas que hablan en serio.
                </motion.p>

                {/* CTA */}
                <motion.div
                    className={styles.ctaWrapper}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.5 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                >
                    <button className="cta-button" onClick={openModal}>
                        <span>Desbloquea tu Infraestructura de Ventas</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </motion.div>

                {/* Trust badge */}
                <motion.div
                    className={styles.trustBadge}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.9 }}
                >
                    <div className={styles.trustDot} />
                    <span>Procesando millones en transacciones a través de nuestra tecnología</span>
                </motion.div>
            </div>
        </section>
    );
}
