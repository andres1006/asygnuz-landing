"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
    UserCog,
    Unplug,
    LineChart,
    DatabaseBackup,
    ListChecks,
    TrendingUp,
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

export default function DiagnosisSection() {
    return (
        <div className="px-6 md:px-16 py-16 w-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1 }}
                className="text-center mb-14 space-y-4"
            >
                <p className="text-[10px] font-mono tracking-[0.5em] text-[#183057]/40 uppercase font-bold">
                    El Diagnóstico
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-[#183057] leading-tight tracking-tight max-w-3xl mx-auto text-balance">
                    ¿Reconoces alguno de
                    <span className="text-[#183057] opacity-60"> estos síntomas?</span>
                </h2>
                <p className="text-sm md:text-base text-[#183057]/50 max-w-2xl mx-auto font-medium leading-relaxed text-pretty">
                    No son fallas tuyas. Son señales de un negocio que creció más rápido que su
                    estructura. Y todos tienen una misma raíz: falta un sistema operativo digital.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
            >
                {SYMPTOMS.map((s, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants}
                        className="group relative rounded-3xl p-7 bg-white border border-[#183057]/[0.07] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,48,87,0.07)] transition-all duration-500"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className="w-11 h-11 rounded-2xl bg-[#183057]/5 flex items-center justify-center text-[#183057] transition-transform duration-500 group-hover:scale-110">
                                {s.icon}
                            </div>
                            <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-[#183057]/30">
                                {s.tag}
                            </span>
                        </div>
                        <h3 className="text-lg font-black text-[#183057] mb-2 leading-snug">{s.title}</h3>
                        <p className="text-sm text-[#183057]/55 font-medium leading-relaxed">{s.text}</p>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-2xl mx-auto space-y-3"
            >
                <h3 className="text-xl md:text-3xl font-bold leading-tight text-balance">
                    <span className="text-[#183057]">Reconocer el síntoma es el primer paso.</span><br />
                    <span className="text-[#183057]/60">Lo siguiente es construir el sistema.</span>
                </h3>
                <p className="text-[10px] text-[#183057]/25 font-mono tracking-[0.2em] uppercase">
                    Diagnóstico operativo — ASYGNUZ 2026
                </p>
            </motion.div>
        </div>
    );
}
