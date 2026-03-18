"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const PROMISES = [
    { label: "Para Claudia", text: "La paradoja se resuelve. La empresaria que enseña estructura al mundo tendrá la estructura que su propio negocio merece." },
    { label: "Para el equipo", text: "Carlos, Daniela y el equipo tendrán las herramientas, los procesos y la claridad para trabajar sin fricciones." },
    { label: "Para el movimiento", text: "Rebelión, el Método Vórtex y la educación financiera en LATAM tendrán la infraestructura que ningún movimiento de esta magnitud puede permitirse no tener." },
];

const NEXT_STEPS = [
    { day: "Día 1-2", action: "Decisión de escenario", detail: "Reunión de cierre con Andrés y Juan." },
    { day: "Día 3", action: "Firma del acuerdo", detail: "Contrato y estructura de pago." },
    { day: "Día 4-5", action: "Sesión de Kickoff", detail: "Reunión de arranque con todo el equipo." },
    { day: "Día 6-7", action: "Inicio Fase AUDIT", detail: "Levantamiento completo del ecosistema digital." },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
} as const;

export default function FinalCTA() {
    const [isActivated, setIsActivated] = useState(false);

    const handleActivate = () => setIsActivated(true);

    return (
        <div className="flex flex-col items-center justify-center px-6 md:px-16 py-16 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center mb-16 space-y-6 max-w-4xl"
            >
                <p className="text-[10px] font-mono tracking-[0.5em] text-[#183057]/40 uppercase font-bold">
                    El Comienzo
                </p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#183057] leading-[1.05]">
                    No venimos a ser tu agencia.<br />
                    <span className="text-[#183057] opacity-60">Venimos a construir la tuya.</span>
                </h2>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mb-16"
            >
                {PROMISES.map((p, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="p-6 rounded-2xl bg-white border border-[#183057]/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3 hover:border-[#183057]/10 transition-colors"
                    >
                        <p className="text-[10px] font-mono tracking-[0.2em] text-[#183057] uppercase font-bold">{p.label}</p>
                        <p className="text-sm text-[#183057]/80 leading-relaxed font-medium">{p.text}</p>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-3xl mb-16"
            >
                <p className="text-center text-[10px] font-mono tracking-[0.4em] text-[#1a1a2e]/25 uppercase mb-8">
                    Próximos 7 días
                </p>
                <div className="space-y-3">
                    {NEXT_STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#183057]/5 shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-transform hover:translate-x-1"
                        >
                            <div className="w-16 shrink-0 text-[#183057]/60 text-xs font-mono font-bold">{step.day}</div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-[#183057]/80">{step.action}</p>
                                <p className="text-xs text-[#183057]/30 font-medium">{step.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {!isActivated ? (
                    <motion.button
                        key="cta-button"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={handleActivate}
                        className="group relative px-14 py-5 bg-[#183057] text-white font-mono font-bold text-sm tracking-[0.2em] rounded-full overflow-hidden hover:shadow-[0_0_40px_rgba(24,48,87,0.3)] transition-shadow"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        <span className="relative">ACTIVAR EL PROGRAMA</span>
                    </motion.button>
                ) : (
                    <motion.div key="cta-confirmed" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }}
                            className="w-20 h-20 rounded-full bg-[#183057]/5 border-2 border-[#183057]/20 flex items-center justify-center">
                            <Check size={36} className="text-[#183057]" />
                        </motion.div>
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-black text-[#183057] flex items-center gap-2 justify-center">
                                <Sparkles size={20} /> Programa Activado
                            </h3>
                            <p className="text-sm text-[#183057]/40 font-medium">
                                Asygnuz se pondrá en contacto contigo en las próximas 24 horas.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-20 text-center space-y-3">
                <p className="text-[10px] font-mono text-[#1a1a2e] tracking-[0.3em]">
                    ASYGNUZ S.A.S. — MANIZALES, COLOMBIA — MARZO 2026
                </p>
                <p className="text-[10px] font-mono text-[#1a1a2e] tracking-[0.2em]">
                    Juan Pablo Ríos Carmona · Andrés Agudelo
                </p>
                <p className="text-[9px] font-mono text-[#1a1a2e] tracking-[0.2em]">
                    Propuesta Versión 1.0 — Confidencial
                </p>
            </div>
        </div>
    );
}
