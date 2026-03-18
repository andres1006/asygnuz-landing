"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '@/lib/propuesta/audio-manager';
import { X } from 'lucide-react';

const PHASES = [
    { id: 'A', title: "AUDIT", phase: "BUILD (Mes 1)", content: "Diagnóstico completo del ecosistema. Customer Journey Map actualizado. Inventario total de herramientas y riesgos." },
    { id: 'S', title: "SOVEREIGNTY", phase: "BUILD (Meses 1-2)", content: "Transferencia completa de accesos. Backup estructurado. Política de datos. Activación de la Reserva de Oxígeno." },
    { id: 'C', title: "CORE SYSTEM", phase: "BUILD (Meses 2-4)", content: "Nuevo CRM propio. Chatbot de calificación. Sistema de comisiones automatizado. Dashboard consolidado." },
    { id: 'E', title: "ECOSYSTEM", phase: "OPERATE (Meses 4-8)", content: "Estrategia orgánica de Instagram. Coaches con perfiles creciendo. Atribución de leads por coach." },
    { id: 'N', title: "NETWORK SCALE", phase: "OPERATE+ (Meses 8-14)", content: "Coaches generando leads autónomos. Automatizaciones de WhatsApp. Claudia fuera de la operación diaria." },
    { id: 'D', title: "DIGITAL HANDOFF", phase: "TRANSFER (Mes 14+)", content: "Agencia interna operando con autonomía. Carlos como Tech Lead con infraestructura sólida." }
];

export default function Chapter3Orbital() {
    const [activePhase, setActivePhase] = useState<typeof PHASES[0] | null>(null);
    const [drawnConnections, setDrawnConnections] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDrawnConnections(prev => {
                if (prev < PHASES.length) {
                    audioManager.playChime();
                    return prev + 1;
                }
                clearInterval(timer);
                return prev;
            });
        }, 800);
        return () => clearInterval(timer);
    }, []);

    const handlePhaseClick = (phase: typeof PHASES[0]) => {
        setActivePhase(phase);
        audioManager.playPing();
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#FFFFFF] relative overflow-hidden bg-[linear-gradient(rgba(24,48,87,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(24,48,87,0.05)_1px,transparent_1px)] bg-[size:40px_40px]">
            <div className={`relative w-full max-w-4xl h-[600px] transition-transform duration-500 ${activePhase ? '-translate-x-1/4' : ''}`}>
                <svg viewBox="0 0 800 600" className="w-full h-full">
                    {/* Connections */}
                    {PHASES.map((_, i) => i < drawnConnections - 1 && (
                        <motion.line
                            key={`line-${i}`}
                            x1={400 + Math.sin((i * 60 - 120) * Math.PI / 180) * 200}
                            y1={300 + Math.cos((i * 60 - 120) * Math.PI / 180) * 200}
                            x2={400 + Math.sin(((i + 1) * 60 - 120) * Math.PI / 180) * 200}
                            y2={300 + Math.cos(((i + 1) * 60 - 120) * Math.PI / 180) * 200}
                            stroke="#183057"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.2 }}
                        />
                    ))}

                    {/* Nodes */}
                    {PHASES.map((phase, i) => {
                        const angle = (i * 60 - 120) * Math.PI / 180;
                        const x = 400 + Math.sin(angle) * 200;
                        const y = 300 + Math.cos(angle) * 200;
                        const isVisible = i < drawnConnections;

                        return isVisible && (
                            <motion.g
                                key={phase.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                onClick={() => handlePhaseClick(phase)}
                                className="cursor-pointer group"
                            >
                                <circle
                                    cx={x}
                                    cy={y}
                                    r="30"
                                    fill="white"
                                    stroke={activePhase?.id === phase.id ? "#183057" : "rgba(24,48,87,0.15)"}
                                    strokeWidth="2"
                                    className="group-hover:stroke-[#183057] transition-colors shadow-sm"
                                />
                                <text
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="#183057"
                                    className="font-black text-xl pointer-events-none"
                                >
                                    {phase.id}
                                </text>
                                <text
                                    x={x}
                                    y={y + 45}
                                    textAnchor="middle"
                                    fill="#183057"
                                    className="text-[10px] font-mono tracking-widest opacity-40 uppercase pointer-events-none font-bold"
                                >
                                    {phase.title}
                                </text>
                            </motion.g>
                        );
                    })}
                </svg>
            </div>

            <AnimatePresence>
                {activePhase && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="absolute right-0 top-0 h-full w-full md:w-1/3 bg-white/95 backdrop-blur-xl border-l border-[#183057]/10 p-12 flex flex-col justify-center space-y-8 z-20"
                    >
                        <button
                            onClick={() => setActivePhase(null)}
                            className="absolute top-8 right-8 text-[#183057]/20 hover:text-[#183057] transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <div className="space-y-2">
                            <span className="text-6xl font-black text-[#183057] opacity-10">{activePhase.id}</span>
                            <h3 className="text-3xl font-black text-[#183057]">{activePhase.title}</h3>
                            <span className="inline-block px-3 py-1 bg-[#183057]/5 text-[#183057] text-[10px] font-mono rounded-full font-bold">
                                {activePhase.phase}
                            </span>
                        </div>
                        <p className="text-[#183057]/60 leading-relaxed text-sm font-medium">
                            {activePhase.content}
                        </p>
                        <div className="pt-8 border-t border-[#183057]/10">
                            <p className="text-[10px] font-mono text-[#183057]/30 uppercase tracking-[0.2em] font-bold">Entregables Clave</p>
                            <ul className="mt-4 space-y-2">
                                <li className="text-xs text-[#183057]/60 flex items-start gap-2 font-medium">
                                    <span className="text-[#183057]/40">→</span> Documentación técnica End-to-End.
                                </li>
                                <li className="text-xs text-[#183057]/60 flex items-start gap-2 font-medium">
                                    <span className="text-[#183057]/40">→</span> Propiedad intelectual 100% de la marca.
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <div className="text-[10px] font-mono text-[#183057]/20 uppercase tracking-[0.3em] font-bold">
                    Interactúa con los nodos para explorar el método
                </div>
            </div>
        </div>
    );
}
