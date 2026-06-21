"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
    Workflow,
    Database,
    Megaphone,
    Users,
    Building2,
    Rocket,
    AlertCircle,
    CheckCircle,
    TrendingUp,
} from 'lucide-react';

const TRANSFORMATIONS = [
    {
        icon: <Workflow className="w-5 h-5" />,
        label: "OPERACIÓN",
        today: "El negocio depende de tu presencia diaria.",
        future: "Un sistema operativo digital que funciona aunque tú no estés.",
    },
    {
        icon: <Database className="w-5 h-5" />,
        label: "CRM & DATOS",
        today: "Contactos dispersos en chats y hojas de cálculo.",
        future: "Un CRM único, integrado y con tus datos bajo tu control.",
    },
    {
        icon: <Megaphone className="w-5 h-5" />,
        label: "MARKETING",
        today: "Inviertes en pauta sin saber qué genera resultados.",
        future: "Atribución clara de cada lead por canal, campaña y contenido.",
    },
    {
        icon: <Users className="w-5 h-5" />,
        label: "EQUIPO",
        today: "Tareas sin responsables y reuniones sin foco.",
        future: "Roles claros, tablero de prioridades y seguimiento real.",
    },
    {
        icon: <Building2 className="w-5 h-5" />,
        label: "AUTONOMÍA",
        today: "Dependes de proveedores externos para todo.",
        future: "Tu propia agencia interna operando con autonomía.",
    },
    {
        icon: <Rocket className="w-5 h-5" />,
        label: "CRECIMIENTO",
        today: "Cada vez que creces, el caos crece contigo.",
        future: "Una infraestructura que escala con rentabilidad.",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function VisionSection() {
    return (
        <div className="px-6 md:px-16 py-24 relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#60A5FA]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center mb-16 space-y-4 relative z-10"
            >
                <p className="text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase font-bold">
                    La Visión
                </p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl mx-auto text-balance">
                    De donde estás hoy
                    <span className="text-white opacity-40 italic"> a donde mereces estar.</span>
                </h2>
                <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto font-medium leading-relaxed text-pretty">
                    Esta es la transformación concreta que construimos contigo. No promesas vagas:
                    un antes y un después medible en cada área de tu negocio.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
            >
                {TRANSFORMATIONS.map((t, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants}
                        className="group relative bg-white/[0.04] backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:border-white/20 transition-all duration-500 overflow-hidden"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 text-[#93C5FD] transition-transform duration-500 group-hover:scale-110">
                                {t.icon}
                            </div>
                            <span className="text-[11px] font-mono tracking-[0.2em] font-bold text-white/80">
                                {t.label}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-6 relative">
                            <div className="relative pl-10">
                                <AlertCircle className="absolute left-0 top-0 w-6 h-6 text-white/10" />
                                <p className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase mb-2 font-bold">
                                    Hoy — La Realidad
                                </p>
                                <p className="text-white/40 text-sm leading-relaxed italic font-medium">
                                    &quot;{t.today}&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-4 py-1">
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/0 via-white/10 to-transparent" />
                                <TrendingUp className="w-4 h-4 text-white opacity-20" />
                                <div className="h-[1px] flex-1 bg-gradient-to-l from-white/0 via-white/10 to-transparent" />
                            </div>

                            <div className="relative pl-10 border-l-4 border-white/20 rounded-sm">
                                <CheckCircle className="absolute -left-[14px] top-6 w-6 h-6 text-white bg-[#183057] rounded-full border border-white/20 p-0.5" />
                                <p className="text-[9px] font-mono tracking-[0.2em] text-white/80 uppercase mb-2 font-black">
                                    Con ASYGNUZ — El Estándar
                                </p>
                                <p className="text-white text-base lg:text-lg font-black leading-snug">
                                    {t.future}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-16 text-center relative z-10">
                <p className="text-[10px] text-white/20 font-mono tracking-[0.2em] uppercase">
                    Hacia una estructura de clase mundial — ASYGNUZ 2026
                </p>
            </div>
        </div>
    );
}
