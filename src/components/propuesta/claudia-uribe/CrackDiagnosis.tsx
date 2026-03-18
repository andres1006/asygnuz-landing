"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARADOXES = [
    {
        teach: "\"Invertir sin estructura es improvisación.\"",
        live: "La infraestructura digital opera sin arquitectura formal.",
        icon: "🏗️",
        color: "#183057",
        bg: "white",
    },
    {
        teach: "\"La Reserva de Oxígeno protege ante imprevistos.\"",
        live: "Los datos no tienen backup estructurado ni soberanía garantizada.",
        icon: "🫁",
        color: "#2C4B7D",
        bg: "white",
    },
    {
        teach: "\"El plan financiero es el mapa.\"",
        live: "No existe un sistema operativo digital que integre el negocio.",
        icon: "🗺️",
        color: "#183057",
        bg: "white",
    },
    {
        teach: "\"Tu método no debe depender de tu figura.\"",
        live: "La operación aun es muy Claudiadependiente.",
        icon: "🎯",
        color: "#2C4B7D",
        bg: "white",
    },
    {
        teach: "\"Diciendo y haciendo.\"",
        live: "La ventana de preparación es ahora. No cuando el volumen ya llegó y la crisis ya empezó.",
        icon: "⚠️",
        color: "#183057",
        bg: "white",
    },
];

export default function CrackDiagnosis() {
    const containerRef = useRef<HTMLDivElement>(null);
    const crackRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".crack-title", {
                scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
                opacity: 0, y: 30, duration: 1,
            });

            if (crackRef.current) {
                gsap.fromTo(crackRef.current,
                    { strokeDashoffset: 600 },
                    { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut", scrollTrigger: { trigger: ".crack-svg-container", start: "top 75%" } }
                );
                gsap.to(crackRef.current, {
                    stroke: "#183057", strokeWidth: 3, filter: "drop-shadow(0 0 12px rgba(24,48,87,0.4))",
                    duration: 1.5, delay: 2.5, scrollTrigger: { trigger: ".crack-svg-container", start: "top 75%" },
                });
            }

            gsap.from(".crack-resolution", {
                scrollTrigger: { trigger: ".crack-resolution", start: "top 85%" },
                opacity: 0, y: 20, duration: 1,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="px-6 md:px-16 py-16 relative" style={{ perspective: '1000px' }}>
            <div className="text-center mb-12 space-y-3">
                <p className="crack-title text-[10px] font-mono tracking-[0.5em] text-[#183057]/40 uppercase font-black">
                    Parte II — Diagnóstico Estratégico
                </p>
                <h2 className="crack-title text-2xl md:text-4xl font-bold text-[#183057] leading-tight max-w-3xl mx-auto">
                    La paradoja que el movimiento
                    <span className="text-[#183057] opacity-60 italic"> no puede ignorar.</span>
                </h2>
            </div>

            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 px-2">
                {PARADOXES.map((p, i) => (
                    <div
                        key={i}
                        className={`paradox-card will-change-transform rounded-3xl p-8 border border-[#183057]/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${i === PARADOXES.length - 1 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
                        style={{
                            backgroundColor: p.bg,
                        }}
                    >
                        <div className="flex flex-col gap-6">

                            {/* TEACHING */}
                            <div className="relative pl-4 border-l-2" style={{ borderColor: p.color }}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">{p.icon}</span>
                                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold" style={{ color: p.color }}>
                                        Filosofía de la marca
                                    </span>
                                </div>
                                <p className="text-[#183057] text-base lg:text-lg font-semibold leading-snug">
                                    {p.teach}
                                </p>
                            </div>

                            {/* REALITY */}
                            <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#183057]/5">
                                <p className="text-[10px] font-mono tracking-[0.2em] text-[#183057]/40 uppercase mb-2">
                                    Oportunidad de mejora
                                </p>
                                <p className="text-sm lg:text-base font-medium leading-normal" style={{ color: p.color }}>
                                    {p.live}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>


            <div className="crack-resolution text-center max-w-2xl mx-auto space-y-3">
                <h3 className="text-xl md:text-3xl font-bold leading-tight">
                    <span className="text-[#183057]">Esta paradoja no es una crítica.</span><br />
                    <span className="text-[#183057]/60">Es la oportunidad más poderosa del negocio.</span>
                </h3>
                <p className="text-[10px] text-[#183057]/20 font-mono tracking-[0.2em]">
                    FRAGILIDAD DIGITAL ESTRUCTURAL — DIAGNÓSTICO ASYGNUZ
                </p>
            </div>
        </div>
    );
}
