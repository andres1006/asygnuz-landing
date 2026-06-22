"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const STEPS = [
    { n: "1", title: "Conversación inicial", detail: "30 min, sin costo y sin compromiso. Entendemos tu negocio." },
    { n: "2", title: "Diagnóstico", detail: "Definimos juntos los KPIs y el objetivo del programa." },
    { n: "3", title: "Plan a medida y arranque", detail: "Te recomendamos el modelo ideal y empezamos a ejecutar." },
];

const CONTACT_EMAIL = "hola@asygnuz.com";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "Quiero agendar una conversación — Oferta de Servicios 2026"
)}&body=${encodeURIComponent(
    "Hola equipo ASYGNUZ,\n\nVi su oferta de servicios 2026 y me gustaría agendar la conversación inicial de 30 minutos.\n\nMi negocio: \nLo que más me interesa (Consultoría / Full Management / aún no estoy seguro): \n\nGracias."
)}`;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

export default function ServicesCTA() {
    const [isActivated, setIsActivated] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center px-6 md:px-16 py-24 relative">
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
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#183057] leading-[1.05] text-balance">
                    No venimos a ser tu agencia.<br />
                    <span className="text-[#183057] opacity-60">Venimos a construir la tuya.</span>
                </h2>
                <p className="text-base md:text-lg text-[#183057]/50 max-w-2xl mx-auto font-medium leading-relaxed text-pretty">
                    Ya sea con guía experta o con la operación completa a cargo nuestro, el objetivo
                    es el mismo: que la estructura quede dentro de tu empresa. El primer paso es una
                    conversación de 30 minutos — te decimos con honestidad cuál servicio tiene más
                    sentido para ti ahora.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl mb-16"
            >
                {STEPS.map((step, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="p-8 rounded-[2rem] bg-white border border-[#183057]/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,48,87,0.06)] transition-all duration-500"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-[#183057] text-white flex items-center justify-center text-xl font-black mb-5">
                            {step.n}
                        </div>
                        <p className="text-lg font-black text-[#183057] mb-2">{step.title}</p>
                        <p className="text-sm text-[#183057]/50 font-medium leading-relaxed">{step.detail}</p>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence mode="wait">
                {!isActivated ? (
                    <motion.a
                        key="cta-button"
                        href={MAILTO}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={() => setIsActivated(true)}
                        className="group relative inline-flex items-center justify-center px-14 py-5 bg-[#183057] text-white font-mono font-bold text-sm tracking-[0.2em] rounded-full overflow-hidden hover:shadow-[0_0_40px_rgba(24,48,87,0.3)] transition-shadow min-h-[44px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        <span className="relative">AGENDAR CONVERSACIÓN GRATIS</span>
                    </motion.a>
                ) : (
                    <motion.div key="cta-confirmed" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }}
                            className="w-20 h-20 rounded-full bg-[#183057]/5 border-2 border-[#183057]/20 flex items-center justify-center">
                            <Check size={36} className="text-[#183057]" />
                        </motion.div>
                        <div className="text-center space-y-2">
                            <h3 className="text-2xl font-black text-[#183057] flex items-center gap-2 justify-center">
                                <Sparkles size={20} /> Ya casi
                            </h3>
                            <p className="text-sm text-[#183057]/50 font-medium max-w-sm">
                                Te abrimos un correo listo para enviar. Si no se abrió, escríbenos a{' '}
                                <a href={MAILTO} className="text-[#183057] font-bold underline underline-offset-2">{CONTACT_EMAIL}</a>.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-20 text-center space-y-3">
                <p className="text-[10px] font-mono text-[#1a1a2e] tracking-[0.3em]">
                    ASYGNUZ S.A.S. — asygnuz.com — MANIZALES, COLOMBIA — 2026
                </p>
                <p className="text-[9px] font-mono text-[#1a1a2e]/60 tracking-[0.2em]">
                    Oferta de Servicios · Confidencial
                </p>
            </div>
        </div>
    );
}
