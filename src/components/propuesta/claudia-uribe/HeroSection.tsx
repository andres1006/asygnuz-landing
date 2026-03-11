"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ isAudioReady, onInitAudio }: { isAudioReady: boolean; onInitAudio: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const fixedTitleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!titleRef.current || !isAudioReady || !fixedTitleRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-line",
                { opacity: 0, y: 80, rotateX: -45, skewY: 2 },
                { opacity: 1, y: 0, rotateX: 0, skewY: 0, duration: 1.2, stagger: 0.15, ease: "expo.out" }
            );
            gsap.fromTo(".hero-deco",
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 1, stagger: 0.1, delay: 0.8, ease: "back.out(2)" }
            );
            gsap.fromTo(".hero-sub",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 1.2, ease: "power3.out" }
            );

            // Fixed title zoom out + fade
            gsap.to(fixedTitleRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.8,
                },
                scale: 0.3,
                opacity: 0,
                filter: "blur(12px)",
                ease: "none",
            });

            gsap.to(".hero-details", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "40% top",
                    scrub: 0.8,
                },
                opacity: 0,
                y: -20,
                ease: "none",
            });

            gsap.to(".scroll-indicator", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "5% top",
                    end: "15% top",
                    scrub: true,
                },
                opacity: 0,
                y: -20,
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isAudioReady]);

    return (
        <div ref={containerRef}>
            {/* PRE-INIT */}
            {!isAudioReady ? (
                <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#F8FAFC]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="relative z-10 flex flex-col items-center gap-10 px-6"
                    >
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[500px] h-[500px] rounded-full border border-[#183057]/[0.1] pointer-events-none" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[380px] h-[380px] rounded-full border border-[#183057]/[0.08] pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <img src="/logos/AsygnuzLogo1-010.png" alt="Asygnuz Logo" className="h-16 md:h-20 object-contain" />
                            <p className="text-[10px] font-mono tracking-[0.8em] text-[#183057]/40 uppercase">presenta</p>
                        </motion.div>

                        <div className="text-center leading-[0.85]" style={{ fontFamily: "'Inter', sans-serif" }}>
                            <span className="block text-6xl md:text-9xl lg:text-[140px] font-black text-[#183057]/[0.05] tracking-[-0.03em]">CLAUDIA</span>
                            <span className="block text-6xl md:text-9xl lg:text-[140px] font-black text-[#183057]/[0.05] tracking-[-0.03em]">URIBE</span>
                        </div>

                        <motion.button
                            onClick={onInitAudio}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative mt-4 overflow-hidden"
                        >
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#183057]/20 via-transparent to-[#183057]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative px-12 py-5 bg-[#183057] border border-[#183057] rounded-full transition-all duration-500 hover:bg-[#2C4B7D]">
                                <span className="relative text-white font-black font-mono text-xs tracking-[0.4em] uppercase">
                                    Iniciar Experiencia
                                </span>
                            </div>
                        </motion.button>
                        <p className="text-[9px] font-mono text-[#183057]/20 tracking-[0.4em]">PROPUESTA CONFIDENCIAL — MARZO 2026</p>
                    </motion.div>
                </div>
            ) : (

                /* POST-INIT — Fixed title zoom out */
                <>
                    <div
                        ref={fixedTitleRef}
                        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none will-change-transform bg-[#F8FAFC]"
                    >
                        {/* More particles and deco - Darker for visibility on white */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <motion.div animate={{ opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#183057]/5 rounded-full blur-[100px]" />
                            <motion.div animate={{ opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#2C4B7D]/5 rounded-full blur-[120px]" />
                        </div>

                        <div ref={titleRef} className="flex flex-col items-center px-6 w-full max-w-[1400px] relative z-20">
                            {/* Floating particles - Enhanced and Darker */}
                            <motion.div animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 6, repeat: Infinity }}
                                className="hero-deco absolute top-[-20%] left-[5%] w-2 h-2 rounded-full bg-[#183057]/40 shadow-[0_0_10px_rgba(24,48,87,0.2)]" />
                            <motion.div animate={{ y: [20, -20, 20], x: [10, -10, 10], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 8, repeat: Infinity }}
                                className="hero-deco absolute top-[10%] right-[5%] w-3 h-3 rounded-full bg-[#2C4B7D]/30 shadow-[0_0_15px_rgba(44,75,125,0.1)]" />
                            <motion.div animate={{ y: [-30, 30, -30], x: [15, -15, 15], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                                className="hero-deco absolute bottom-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#183057]/40" />
                            <motion.div animate={{ y: [15, -15, 15], x: [-20, 20, -20], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                className="hero-deco absolute top-[40%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#183057]/60 shadow-[0_0_8px_rgba(24,48,87,0.3)]" />

                            {/* Badge */}
                            <div className="hero-details mb-8">
                                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#183057]/10 bg-white/60 backdrop-blur-md">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#183057] animate-pulse" />
                                    <span className="text-[10px] font-mono tracking-[0.5em] text-[#183057]/60 uppercase">Asygnuz S.A.S. presenta</span>
                                </span>
                            </div>

                            {/* THE TITLE */}
                            <div className="text-center" style={{ perspective: 800 }}>
                                <div className="hero-line overflow-hidden">
                                    <span className="block text-6xl md:text-[120px] lg:text-[180px] font-black tracking-[-0.04em] leading-[0.85] text-[#183057]/90"
                                        style={{ fontFamily: "'Inter', sans-serif" }}>
                                        METODO
                                    </span>
                                </div>
                                <div className="hero-line overflow-hidden">
                                    <span className="block text-6xl md:text-[120px] lg:text-[180px] font-black tracking-[-0.04em] leading-[0.85] text-[#183057]"
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            background: 'linear-gradient(180deg, #183057 0%, #2C4B7D 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}>
                                        A.S.C.E.N.D.
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="hero-details mt-8 flex flex-col items-center">
                                <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#183057]/20 to-transparent mb-6" />
                                <p className="hero-sub font-mono text-sm md:text-base tracking-[0.3em] text-[#183057]/60 uppercase">
                                    M.I.A (Claudia Uribe)
                                </p>
                                <p className="hero-sub text-[11px] font-mono tracking-[0.25em] text-[#183057]/40 uppercase mt-2">
                                    Programa de Transformación Digital · Construcción de Agencia Interna
                                </p>
                            </div>
                        </div>

                        {/* Scroll indicator */}
                        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                                <div className="w-5 h-8 rounded-full border border-[#183057]/20 flex items-start justify-center p-1.5">
                                    <motion.div
                                        animate={{ y: [0, 8, 0] }}
                                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                                        className="w-1 h-1.5 rounded-full bg-[#183057]/40"
                                    />
                                </div>
                            </motion.div>
                            <span className="text-[8px] font-mono text-[#183057]/30 tracking-[0.5em]">SCROLL</span>
                        </div>
                    </div>

                    <div className="h-screen" />
                </>
            )}

            <style jsx>{`
                @keyframes shimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
}
