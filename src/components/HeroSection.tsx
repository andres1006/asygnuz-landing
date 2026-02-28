"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";
import { useLeadModal } from "@/context/LeadModalContext";

export default function HeroSection() {
    const [loaded, setLoaded] = useState(false);
    const { openModal } = useLeadModal();

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background Looping Video */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none mix-blend-screen"
            >
                <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
            
            {/* Fallback pattern */}
            <div className={styles.gridBg}>
                <div className={styles.gridLines} />
            </div>

            {/* Glow orbs - Cyber Blue / Electric Green accents */}
            <div className={styles.orbCyan} />
            <div className={styles.orbNavy} />

            <div className={`container mx-auto px-6 relative z-10 flex flex-col items-center justify-center ${styles.content}`}>
                {/* Logo */}
                <div className={`${styles.logo} ${loaded ? styles.visible : ""}`}>
                    <Image
                        src="/logos/AsygnuzLogo1-010.png"
                        alt="Asygnuz"
                        width={160}
                        height={70}
                        priority
                        style={{ filter: "invert(1)", objectFit: "contain" }}
                    />
                </div>

                {/* Kicker */}
                <div className={`${styles.pretitle} ${loaded ? styles.visible : ""}`}>
                    INGENIERÍA APLICADA A LAS VENTAS
                </div>

                {/* H1 */}
                <h1 className={`${styles.title} ${loaded ? styles.visible : ""}`}>
                    No somos una agencia. <br />
                    Somos tu infraestructura de <span className={styles.highlight}>Growth Engineering</span>.
                </h1>

                {/* Sub-headline */}
                <p className={`${styles.subtitle} ${loaded ? styles.visible : ""}`}>
                    Integramos <strong>Desarrollo de Software</strong>, <strong>Agentes de Inteligencia Artificial</strong> y <strong>Performance Marketing</strong> para crear sistemas de ventas inquebrantables. Para empresas que hablan en serio.
                </p>

                {/* CTA */}
                <div className={`${styles.ctaWrapper} ${loaded ? styles.visible : ""}`}>
                    <button 
                        className="cta-button"
                        onClick={openModal}
                    >
                        <span>Desbloquea tu Infraestructura de Ventas</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>

                {/* Social Proof */}
                <div className={`${styles.trustBadge} ${loaded ? styles.visible : ""}`}>
                    <div className={styles.trustDot}></div>
                    <span>Procesando millones en transacciones a través de nuestra tecnología</span>
                </div>
            </div>
        </section>
    );
}