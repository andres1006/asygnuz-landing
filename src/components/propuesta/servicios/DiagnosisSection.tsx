"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    UserCog,
    Unplug,
    LineChart,
    DatabaseBackup,
    ListChecks,
    TrendingUp,
    Check,
    ArrowRight,
} from 'lucide-react';

const SYMPTOMS = [
    {
        icon: <UserCog className="w-5 h-5" />,
        title: "El negocio depende de ti",
        text: "Si tú no estás, la operación se detiene. Cada decisión, cada cierre y cada proceso pasa por tus manos.",
        tag: "Operación",
    },
    {
        icon: <Unplug className="w-5 h-5" />,
        title: "Tus herramientas no se hablan",
        text: "CRM, hojas de cálculo y chats viven separados. La información se duplica, se pierde y nadie tiene la foto completa.",
        tag: "Tecnología",
    },
    {
        icon: <LineChart className="w-5 h-5" />,
        title: "No sabes qué marketing funciona",
        text: "Inviertes en pauta y contenido, pero no hay trazabilidad clara de qué canal trae los leads que realmente cierran.",
        tag: "Marketing",
    },
    {
        icon: <DatabaseBackup className="w-5 h-5" />,
        title: "Tus datos no tienen dueño claro",
        text: "Información crítica sin respaldo estructurado ni soberanía. Si un proveedor desaparece, tu activo más valioso se va con él.",
        tag: "Soberanía",
    },
    {
        icon: <ListChecks className="w-5 h-5" />,
        title: "El equipo trabaja sin estructura",
        text: "Tareas sin responsables, reuniones sin foco y prioridades que cambian cada semana. Mucho movimiento, poco avance.",
        tag: "Gestión",
    },
    {
        icon: <TrendingUp className="w-5 h-5" />,
        title: "Creces, pero el caos crece contigo",
        text: "Más volumen significa más fricción, no más rentabilidad. La ventana para ordenar la operación es ahora, no en plena crisis.",
        tag: "Escala",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function verdict(count: number): { title: string; text: string } {
    if (count === 0)
        return {
            title: "Marca los que reconozcas en tu negocio.",
            text: "Toca cada tarjeta que describa tu día a día. Al final te decimos qué significa.",
        };
    if (count <= 2)
        return {
            title: "Estás a tiempo de adelantarte.",
            text: "Aún son fugas pequeñas, pero crecen con el negocio. Ordenarlo ahora cuesta una fracción de lo que costará después.",
        };
    if (count <= 4)
        return {
            title: "No necesitas esforzarte más. Necesitas un sistema.",
            text: "Estos síntomas ya te están costando leads, tiempo y rentabilidad cada mes. La buena noticia: todos comparten la misma raíz y la misma solución.",
        };
    return {
        title: "El caos ya es el cuello de botella de tu crecimiento.",
        text: "Cada mes así drena ingresos y energía. Es el momento exacto para construir la estructura — antes de que la próxima ola de demanda te encuentre sin sistema.",
    };
}

export default function DiagnosisSection() {
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const toggle = (i: number) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });
    };

    const count = selected.size;
    const v = verdict(count);

    return (
        <div className="px-6 md:px-16 py-16 w-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1 }}
                className="text-center mb-12 space-y-4"
            >
                <p className="text-[10px] font-mono tracking-[0.5em] text-[#183057]/50 uppercase font-bold">
                    El Diagnóstico
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-[#183057] leading-tight tracking-tight max-w-3xl mx-auto text-balance">
                    Cada mes sin estructura
                    <span className="text-[#183057] opacity-60"> tiene un costo.</span>
                </h2>
                <p className="text-sm md:text-base text-[#183057]/60 max-w-2xl mx-auto font-medium leading-relaxed text-pretty">
                    No son fallas tuyas: son señales de un negocio que creció más rápido que su
                    estructura. <span className="text-[#183057] font-bold">Marca los síntomas que reconozcas</span> y
                    descubre qué tan urgente es ordenar tu operación.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
            >
                {SYMPTOMS.map((s, i) => {
                    const isOn = selected.has(i);
                    return (
                        <motion.button
                            key={i}
                            variants={cardVariants}
                            onClick={() => toggle(i)}
                            aria-pressed={isOn}
                            className={`group relative text-left rounded-3xl p-7 border transition-all duration-500 min-h-[44px] cursor-pointer ${
                                isOn
                                    ? 'bg-[#183057] border-[#183057] shadow-[0_18px_40px_rgba(24,48,87,0.25)] -translate-y-1'
                                    : 'bg-white border-[#183057]/[0.07] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,48,87,0.07)]'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div
                                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                        isOn ? 'bg-white/15 text-white' : 'bg-[#183057]/5 text-[#183057] group-hover:scale-110'
                                    }`}
                                >
                                    {s.icon}
                                </div>
                                <span
                                    className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                                        isOn ? 'bg-white border-white' : 'border-[#183057]/20'
                                    }`}
                                >
                                    {isOn && <Check className="w-4 h-4 text-[#183057]" strokeWidth={3} />}
                                </span>
                            </div>
                            <h3 className={`text-lg font-black mb-2 leading-snug transition-colors duration-500 ${isOn ? 'text-white' : 'text-[#183057]'}`}>
                                {s.title}
                            </h3>
                            <p className={`text-sm font-medium leading-relaxed transition-colors duration-500 ${isOn ? 'text-white/70' : 'text-[#183057]/60'}`}>
                                {s.text}
                            </p>
                            <span className={`mt-4 inline-block text-[9px] font-mono tracking-[0.2em] uppercase font-bold transition-colors duration-500 ${isOn ? 'text-white/50' : 'text-[#183057]/30'}`}>
                                {s.tag}
                            </span>
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* Live verdict / counter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto rounded-[2rem] bg-[#F8FAFC] border border-[#183057]/[0.08] p-8 md:p-10 flex flex-col md:flex-row items-center gap-7"
            >
                <div className="shrink-0 flex flex-col items-center justify-center">
                    <div className="relative w-24 h-24 rounded-full bg-[#183057] flex items-center justify-center">
                        <span className="text-4xl font-black text-white tabular-nums">{count}</span>
                        <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-white border border-[#183057]/10 text-[9px] font-mono font-bold text-[#183057]/60 tracking-wider">
                            DE 6
                        </span>
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-xl md:text-2xl font-black text-[#183057] mb-2 leading-tight text-balance">
                                {v.title}
                            </h3>
                            <p className="text-sm md:text-base text-[#183057]/60 font-medium leading-relaxed text-pretty">
                                {v.text}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                    {count > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 inline-flex items-center gap-2 text-[#183057] font-mono text-[11px] font-bold tracking-[0.15em] uppercase"
                        >
                            Sigue para ver cómo se ve el después
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
