"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";
import { useLeadModal } from "@/context/LeadModalContext";

export default function HeroSection() {
    const { openModal } = useLeadModal();
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacityBackground = useTransform(scrollYProgress, [0, 0.8], [1, 0]);



    return (
        <section className={`${styles.hero} relative w-full overflow-hidden`} ref={containerRef}>
            {/* Light background: subtle grid + soft radial orbs */}
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
                    initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.4 }}
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
                    initial={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
                >
                    INGENIERÍA APLICADA A LAS VENTAS
                </motion.div>

                {/* H1 */}
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 50 }}
                    style={{ perspective: 1000 }}
                >
                    No somos una agencia. <br />
                    Somos tu infraestructura de <span className={styles.highlight}>Growth Engineering</span>.
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                >
                    Integramos <strong>Desarrollo de Software</strong>, <strong>Agentes de Inteligencia Artificial</strong> y <strong>Performance Marketing</strong> para crear sistemas de ventas inquebrantables. Para empresas que hablan en serio.
                </motion.p>

                {/* CTA */}
                <motion.div
                    className={styles.ctaWrapper}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(24, 48, 87, 0.35)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button
                        className="cta-button"
                        onClick={openModal}
                    >
                        <span>Desbloquea tu Infraestructura de Ventas</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                    className={styles.trustBadge}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.4 }}
                >
                    <div className={styles.trustDot}></div>
                    <span>Procesando millones en transacciones a través de nuestra tecnología</span>
                </motion.div>
            </div>
        </section>
    );
}
