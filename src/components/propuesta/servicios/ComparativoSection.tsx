"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ROWS = [
    { label: "¿Quién ejecuta?", consultoria: "Tú, con nuestra guía", full: "Nosotros" },
    { label: "Precio", consultoria: "$500 USD / área / mes", full: "$2,000 → $1,000 USD / mes" },
    { label: "Duración", consultoria: "4 meses mínimo", full: "Desde 6 meses" },
    { label: "Áreas", consultoria: "1, 2 o 3 áreas", full: "IT + Marketing + Comercial" },
    { label: "Sesiones", consultoria: "2 por área al mes", full: "Gestión continua + reuniones" },
    { label: "Ideal para", consultoria: "Aprender y construir capacidad", full: "Delegar y escalar ahora" },
    { label: "Garantía de resultado", consultoria: "check", full: "check" },
];

export default function ComparativoSection() {
    return (
        <div className="px-6 md:px-12 py-16 w-full max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-14 space-y-4"
            >
                <p className="text-[10px] font-mono tracking-[0.5em] text-[#183057]/40 uppercase font-bold">
                    ¿Cuál es el correcto para ti?
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-[#183057] leading-tight tracking-tight">
                    Comparativo <span className="text-[#183057] opacity-60">rápido.</span>
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-[2rem] overflow-hidden border border-[#183057]/10 shadow-[0_12px_40px_rgba(24,48,87,0.05)] bg-white"
            >
                {/* Header row */}
                <div className="grid grid-cols-3 bg-[#F8FAFC] border-b border-[#183057]/10">
                    <div className="p-5 md:p-6" />
                    <div className="p-5 md:p-6 text-center border-l border-[#183057]/10">
                        <p className="text-[10px] font-mono tracking-[0.2em] text-[#183057]/40 uppercase font-bold mb-1">Servicio 01</p>
                        <p className="text-base md:text-xl font-black text-[#183057]">Consultoría</p>
                    </div>
                    <div className="p-5 md:p-6 text-center border-l border-[#183057]/10 bg-[#183057] text-white">
                        <p className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase font-bold mb-1">Servicio 02</p>
                        <p className="text-base md:text-xl font-black">Full Management</p>
                    </div>
                </div>

                {/* Data rows */}
                {ROWS.map((row, i) => (
                    <div key={i} className={`grid grid-cols-3 ${i % 2 === 1 ? 'bg-[#F8FAFC]/50' : 'bg-white'} border-b border-[#183057]/5 last:border-b-0`}>
                        <div className="p-4 md:p-5 flex items-center">
                            <span className="text-[11px] md:text-sm font-bold text-[#183057]/70">{row.label}</span>
                        </div>
                        <div className="p-4 md:p-5 flex items-center justify-center text-center border-l border-[#183057]/10">
                            {row.consultoria === 'check' ? (
                                <span className="inline-flex items-center gap-1.5 text-[#183057] text-xs font-bold">
                                    <Check className="w-4 h-4" /> Incluida
                                </span>
                            ) : (
                                <span className="text-[11px] md:text-sm text-[#183057]/70 font-medium">{row.consultoria}</span>
                            )}
                        </div>
                        <div className="p-4 md:p-5 flex items-center justify-center text-center border-l border-[#183057]/10 bg-[#183057]/[0.03]">
                            {row.full === 'check' ? (
                                <span className="inline-flex items-center gap-1.5 text-[#183057] text-xs font-bold">
                                    <Check className="w-4 h-4" /> Incluida
                                </span>
                            ) : (
                                <span className="text-[11px] md:text-sm text-[#183057]/80 font-semibold">{row.full}</span>
                            )}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
