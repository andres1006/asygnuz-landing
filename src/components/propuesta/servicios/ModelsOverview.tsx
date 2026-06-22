"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Cog, ShieldCheck, ArrowRight } from 'lucide-react';

const MODELS = [
    {
        tag: "Servicio 01",
        title: "Consultoría",
        subtitle: "Aprende y aplica con guía experta.",
        price: "$500",
        unit: "USD por área / mes",
        detail: "4 meses · 3 áreas disponibles",
        areas: "Gestión de Proyectos · Tecnología · Marketing",
        icon: <GraduationCap className="w-6 h-6" />,
        dark: false,
    },
    {
        tag: "Servicio 02",
        title: "Full Management",
        subtitle: "Nos encargamos de la operación completa.",
        price: "$2,000",
        unit: "USD al mes",
        detail: "Precio decrece conforme avanza el programa",
        areas: "IT + Marketing + Crecimiento Comercial",
        icon: <Cog className="w-6 h-6" />,
        dark: true,
    },
];

const INDEX = [
    { n: "01", title: "Caso reciente", desc: "Resultados reales de una implementación activa." },
    { n: "02", title: "Consultoría", desc: "$500 USD/área · 3 áreas · 4 meses." },
    { n: "03", title: "Full Management", desc: "Operación completa con método A.S.C.E.N.D." },
    { n: "04", title: "El Equipo", desc: "Las personas detrás del trabajo." },
    { n: "05", title: "Comparativo", desc: "Cuál es el correcto para ti." },
];

export default function ModelsOverview() {
    return (
        <div className="px-6 md:px-12 py-16 w-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-14 space-y-4"
            >
                <p className="text-[10px] font-mono tracking-[0.5em] text-[#183057]/40 uppercase font-bold">
                    Los Modelos
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-[#183057] leading-tight tracking-tight max-w-3xl mx-auto">
                    Dos maneras de trabajar
                    <span className="text-[#183057] opacity-60"> con nosotros.</span>
                </h2>
                <p className="text-sm md:text-base text-[#183057]/50 max-w-2xl mx-auto font-medium leading-relaxed">
                    Dependiendo de tu momento, te acompañamos como guías expertos o nos encargamos
                    nosotros de la operación completa.
                </p>
            </motion.div>

            {/* Two model cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {MODELS.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.15 }}
                        className={`relative rounded-[2rem] p-8 md:p-10 border overflow-hidden transition-all duration-500 hover:-translate-y-1 ${m.dark
                            ? 'bg-[#183057] border-[#183057] text-white shadow-[0_20px_50px_rgba(24,48,87,0.2)]'
                            : 'bg-white border-[#183057]/10 text-[#183057] shadow-[0_8px_30px_rgba(0,0,0,0.03)]'}`}
                    >
                        <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl ${m.dark ? 'bg-white/10' : 'bg-[#183057]/5'}`} />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <span className={`text-[10px] font-mono tracking-[0.3em] uppercase font-bold ${m.dark ? 'text-white/50' : 'text-[#183057]/40'}`}>
                                    {m.tag}
                                </span>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${m.dark ? 'bg-white/10 text-white' : 'bg-[#183057]/5 text-[#183057]'}`}>
                                    {m.icon}
                                </div>
                            </div>

                            <h3 className="text-3xl font-black tracking-tight mb-2">{m.title}</h3>
                            <p className={`text-sm font-medium mb-8 ${m.dark ? 'text-white/60' : 'text-[#183057]/50'}`}>{m.subtitle}</p>

                            <div className={`pb-6 mb-6 border-b ${m.dark ? 'border-white/10' : 'border-[#183057]/10'}`}>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl md:text-5xl font-black tabular-nums">{m.price}</span>
                                    <span className={`text-xs font-mono ${m.dark ? 'text-white/50' : 'text-[#183057]/40'}`}>{m.unit}</span>
                                </div>
                                <p className={`text-xs mt-2 font-medium ${m.dark ? 'text-white/40' : 'text-[#183057]/40'}`}>{m.detail}</p>
                            </div>

                            <div className="flex items-start gap-2">
                                <ArrowRight className={`w-4 h-4 mt-0.5 shrink-0 ${m.dark ? 'text-white/40' : 'text-[#183057]/40'}`} />
                                <p className={`text-sm font-semibold ${m.dark ? 'text-white/80' : 'text-[#183057]/70'}`}>{m.areas}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Guarantee banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-[2rem] bg-gradient-to-br from-[#F8FAFC] to-white border border-[#183057]/10 p-8 md:p-10 mb-12 flex flex-col md:flex-row items-start md:items-center gap-6"
            >
                <div className="w-14 h-14 rounded-2xl bg-[#183057]/5 flex items-center justify-center text-[#183057] shrink-0">
                    <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-[10px] font-mono tracking-[0.3em] text-[#183057]/40 uppercase font-bold mb-2">
                        Garantía de resultado — incluida en ambos servicios
                    </p>
                    <p className="text-base md:text-lg text-[#183057]/80 font-medium leading-relaxed">
                        Si al finalizar el programa los KPIs acordados no se alcanzan, el contrato se extiende
                        por el porcentaje faltante en meses — <span className="text-[#183057] font-bold">sin costo adicional.</span>
                    </p>
                </div>
            </motion.div>

            {/* Content index */}
            <div className="text-center mb-8">
                <p className="text-[10px] font-mono tracking-[0.4em] text-[#183057]/30 uppercase font-bold">
                    Contenido de esta propuesta
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {INDEX.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white rounded-2xl p-5 border border-[#183057]/[0.06] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <p className="text-2xl font-black text-[#183057]/20 mb-2 tabular-nums">{item.n}</p>
                        <p className="text-sm font-bold text-[#183057] mb-1">{item.title}</p>
                        <p className="text-[11px] text-[#183057]/40 font-medium leading-snug">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
