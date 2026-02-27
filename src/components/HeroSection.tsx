"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const openModal = () => {
        // We will implement the modal logic later
        const modal = document.getElementById("lead-modal");
        if (modal) modal.style.display = "flex";
    };

    return (
        <section className={`${styles.hero} min-h-screen flex items-center relative overflow-hidden bg-black text-white`}>
            {/* Background Looping Video */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none mix-blend-screen"
            >
                <source src="/hero-bg.mp4" type="video/mp4" />
                {/* Fallback pattern */}
                <div className={styles.gridBg}>
                    <div className={styles.gridLines} />
                </div>
            </video>

            {/* Glow orbs - Cyber Blue / Electric Green accents */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className={`container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center ${styles.content}`}>
                {/* Left Column: Typography & CTA */}
                <div className="flex flex-col gap-6">
                    {/* Logo */}
                    <div className={`${styles.logo} ${loaded ? styles.visible : ""} mb-4`}>
                        <Image
                            src="/logos/AsygnuzLogo1-010.png"
                            alt="Asygnuz"
                            width={140}
                            height={60}
                            priority
                            style={{ filter: "invert(1)", objectFit: "contain" }}
                        />
                    </div>

                    {/* Kicker */}
                    <p className={`text-cyan-400 font-mono text-sm tracking-widest uppercase ${loaded ? styles.visible : ""}`}>
                        INGENIERÍA APLICADA A LAS VENTAS
                    </p>

                    {/* H1 */}
                    <h1 className={`text-5xl lg:text-7xl font-bold tracking-tight leading-tight ${loaded ? styles.visible : ""}`}>
                        No somos una agencia. <br />
                        Somos tu infraestructura de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Growth Engineering</span>.
                    </h1>

                    {/* Sub-headline */}
                    <p className={`text-xl text-gray-400 max-w-2xl leading-relaxed ${loaded ? styles.visible : ""}`}>
                        Integramos Desarrollo de Software, Agentes de Inteligencia Artificial y Performance Marketing para crear sistemas de ventas inquebrantables. Para empresas que hablan en serio.
                    </p>

                    {/* CTA */}
                    <div className={`mt-8 ${loaded ? styles.visible : ""}`}>
                        <button 
                            className="bg-white text-black font-semibold py-4 px-8 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3"
                            onClick={openModal}
                        >
                            <span>Desbloquea tu Infraestructura de Ventas</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>

                    {/* Social Proof */}
                    <div className={`mt-12 flex items-center gap-4 text-sm text-gray-500 font-medium ${loaded ? styles.visible : ""}`}>
                        <div className="flex -space-x-2">
                            {/* Placeholder avatars or icons */}
                            <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-black"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-black"></div>
                        </div>
                        <p>"Procesando millones en transacciones a través de nuestra tecnología."</p>
                    </div>
                </div>

                {/* Right Column: 3D Element / Abstract */}
                <div className="hidden lg:block relative h-[600px]">
                    {/* Placeholder for 3D element or dashboard mockup */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/50 to-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-gray-500 font-mono text-sm">
                            [ Sistema de Adquisición Activo ]
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}