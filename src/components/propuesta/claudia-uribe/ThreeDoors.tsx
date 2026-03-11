"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Chapter4BotFader from './Chapter4BotFader';

gsap.registerPlugin(ScrollTrigger);

const SCENARIOS = [
    {
        key: 'A', title: "Outsourcing Permanente",
        fee: "$1,200 – $1,500 USD/mes", duration: "Indefinida",
        role: "Departamento externo de IT, marketing y estrategia digital",
        vision: "Parcialmente: resuelve el riesgo operativo pero no construye la agencia interna",
        recommended: false,
    },
    {
        key: 'B', title: "B.O.T. 2.0 + A.S.C.E.N.D.",
        fee: "$2,000 → $1,000 USD/mes", duration: "18 meses + gobernanza",
        role: "Célula completa: IT + Marketing + Diseño + PM + Gobernanza",
        vision: "Sí: agencia interna propia + soberanía + movimiento autónomo",
        recommended: true, total: "~$24,600 USD en 18 meses",
    },
    {
        key: 'C', title: "Fractional Leadership",
        fee: "$800 – $1,000 USD/mes", duration: "Solo dirección estratégica",
        role: "Fractional CTO + Fractional Growth Director",
        vision: "Mayor riesgo: Claudia asume contratación sin infraestructura previa",
        recommended: false,
    },
];

export default function ThreeDoors() {
    const [selected, setSelected] = useState<string | null>(null);
    const [showFader, setShowFader] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Removed nested GSAP scroll trigger to prevent opacity: 0 lock.
        // Entrance animation is now handled by .section-reveal in page.tsx
    }, []);

    const handleSelect = (key: string) => {
        setSelected(key);
        if (key === 'B') {
            setTimeout(() => setShowFader(true), 600);
        } else {
            setShowFader(false);
        }
    };

    return (
        <div ref={containerRef} className="px-6 md:px-16 py-16">
            <div className="text-center mb-16 space-y-4">
                <p className="text-[10px] font-mono tracking-[0.5em] text-[#183057]/40 uppercase font-bold">
                    Parte V — La Decisión Estratégica
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-[#183057] leading-tight">
                    Tres caminos hacia la
                    <span className="text-[#183057] opacity-60"> soberanía digital.</span>
                </h2>
                <p className="text-base text-[#1a1a2e]/60 max-w-2xl mx-auto">
                    No todos los caminos construyen infraestructura propia. Elige entre seguir dependiendo o construir el motor de tu propio movimiento.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto mb-16">

                {/* HERO CARD - THE RECOMMENDED PATH */}
                <div
                    onClick={() => handleSelect('B')}
                    className={`relative lg:w-3/5 text-left p-10 md:p-14 rounded-3xl border-2 cursor-pointer transition-all duration-500 overflow-hidden ${selected === 'B' || selected === null
                        ? 'border-[#183057]/40 bg-white shadow-[0_20px_60px_rgba(24,48,87,0.1)] scale-[1.02]'
                        : 'border-[#183057]/10 bg-white/50 hover:bg-white scale-100'}`}
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#183057]/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />

                    <div className="absolute top-8 right-8 px-4 py-1.5 bg-gradient-to-r from-[#183057] to-[#2C4B7D] text-white text-[10px] font-mono font-bold tracking-[0.2em] rounded-full shadow-md z-20">
                        EL ÚNICO CAMINO A LA SOBERANÍA
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div>
                            <div className="w-16 h-16 bg-[#183057] text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-lg shadow-[#183057]/20">
                                B
                            </div>
                            <h3 className="text-3xl font-black text-[#183057] leading-tight mb-2">B.O.T. 2.0 + A.S.C.E.N.D.</h3>
                            <p className="text-[#183057]/60 font-black text-lg tracking-tight">Célula completa: IT + Marketing + Crecimiento Comercial</p>
                        </div>

                        <div className="py-6 border-y border-[#1a1a2e]/10">
                            <p className="text-[#1a1a2e]/50 font-mono text-[11px] uppercase tracking-wider mb-2">Inversión Mensual</p>
                            <p className="text-5xl font-black text-[#1a1a2e] tracking-tighter">
                                $2,000<span className="text-xl font-medium text-[#1a1a2e]/40 ml-2 animate-pulse">→ $1,000 USD</span>
                            </p>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="text-[#183057]/40 mt-1">✦</span>
                                <p className="text-[#183057]/80 leading-relaxed font-medium"><strong className="text-[#183057]">Duración:</strong> Programa táctico de 18 meses, transfiriendo conocimiento y gobernanza a tu equipo interno.</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#183057]/40 mt-1">✦</span>
                                <p className="text-[#183057]/80 leading-relaxed font-medium"><strong className="text-[#183057]">Visión:</strong> Creación de tu propia Agencia Interna. El conocimiento se queda en tu empresa, no en un proveedor externo.</p>
                            </li>
                        </ul>

                        <div className="mt-8 p-6 bg-[#183057]/5 border border-[#183057]/10 rounded-2xl">
                            <p className="text-[#183057]/40 font-mono text-[10px] uppercase tracking-wider mb-1 font-bold">Inversión Total Proyectada (18 Meses)</p>
                            <p className="text-[#183057] font-black text-2xl">~$24,600 USD</p>
                        </div>
                    </div>
                </div>

                {/* SECONDARY CARDS - THE TRAPS */}
                <div className="lg:w-2/5 flex flex-col gap-6">

                    {/* Option A */}
                    <div
                        onClick={() => handleSelect('A')}
                        className={`text-left p-8 rounded-3xl border cursor-pointer transition-all duration-300 ${selected === 'A' ? 'border-red-500 bg-red-50 shadow-xl scale-[1.02]' : 'border-[#1a1a2e]/10 bg-white/60 hover:bg-white'}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-[#1a1a2e]/5 text-[#1a1a2e]/40 rounded-xl flex items-center justify-center font-bold">A</div>
                            <span className="text-[9px] font-mono tracking-widest text-[#1a1a2e]/30 uppercase">Dependencia Externa</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1a1a2e] mb-1">Agencia / Outsourcing</h3>
                        <p className="text-lg font-black text-[#1a1a2e]/60 mb-6">$1,200 – $1,500 <span className="text-sm font-medium">USD/mes</span></p>
                        <div className="space-y-3 text-sm">
                            <p className="text-[#1a1a2e]/70"><strong className="text-[#1a1a2e]/90">Duración:</strong> Indefinida (pago eterno)</p>
                            <p className="text-[#1a1a2e]/70 leading-relaxed"><strong className="text-[#1a1a2e]/90">Trampa:</strong> Resuelve el problema hoy, pero no construyes infraestructura. El know-how pertenece a la agencia.</p>
                        </div>
                    </div>

                    {/* Option C */}
                    <div
                        onClick={() => handleSelect('C')}
                        className={`text-left p-8 rounded-3xl border cursor-pointer transition-all duration-300 ${selected === 'C' ? 'border-orange-500 bg-orange-50 shadow-xl scale-[1.02]' : 'border-[#1a1a2e]/10 bg-white/60 hover:bg-white'}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-[#1a1a2e]/5 text-[#1a1a2e]/40 rounded-xl flex items-center justify-center font-bold">C</div>
                            <span className="text-[9px] font-mono tracking-widest text-[#1a1a2e]/30 uppercase">Liderazgo Aislado</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1a1a2e] mb-1">Fractional Leadership</h3>
                        <p className="text-lg font-black text-[#1a1a2e]/60 mb-6">$800 – $1,000 <span className="text-sm font-medium">USD/mes</span></p>
                        <div className="space-y-3 text-sm">
                            <p className="text-[#1a1a2e]/70"><strong className="text-[#1a1a2e]/90">Rol:</strong> Solo directores estratégicos.</p>
                            <p className="text-[#1a1a2e]/70 leading-relaxed"><strong className="text-[#1a1a2e]/90">Riesgo:</strong> Quien ejecuta es Claudia o un equipo interno inexperto. Excelente mapa, pero sin vehículo para recorrerlo.</p>
                        </div>
                    </div>

                </div>
            </div>

            <AnimatePresence>
                {(showFader || selected === 'B' || selected === null) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 40 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full max-w-6xl mx-auto overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#1a1a2e] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                    >
                        <Chapter4BotFader />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
