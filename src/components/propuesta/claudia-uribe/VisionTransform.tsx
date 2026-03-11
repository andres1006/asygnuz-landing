"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Database,
    Zap,
    Brain,
    TrendingUp,
    CheckCircle2,
    Briefcase,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

const TRANSFORMATIONS = [
    {
        icon: <LayoutDashboard className="w-5 h-5" />,
        label: "CRM & ECOSISTEMA",
        today: "CRM en portugués, baja adopción del equipo",
        future: "CRM propio, en español, integrado con el ecosistema completo",
        color: "#60A5FA"
    },
    {
        icon: <Users className="w-5 h-5" />,
        label: "GESTIÓN DE COACHES",
        today: "43 coaches gestionados en Excel",
        future: "Sistema automatizado: comisiones, leads, trazabilidad y resultados",
        color: "#93C5FD"
    },
    {
        icon: <Database className="w-5 h-5" />,
        label: "SOBERANÍA DE DATOS",
        today: "Datos sin backup ni política de protección",
        future: "Reserva de Oxígeno Operativa activa: soberanía digital garantizada",
        color: "#60A5FA"
    },
    {
        icon: <Briefcase className="w-5 h-5" />,
        label: "AGENCIA INTERNA",
        today: "Sin agencia interna propia",
        future: "Agencia interna operando: trafikker, diseñador, community manager",
        color: "#93C5FD"
    },
    {
        icon: <Brain className="w-5 h-5" />,
        label: "ZONA DE GENIO",
        today: "Claudia es el cuello de botella operativo",
        future: "Claudia en su Zona de Genio: estrategia, contenido y expansión",
        color: "#60A5FA"
    },
    {
        icon: <TrendingUp className="w-5 h-5" />,
        label: "TRAZABILIDAD",
        today: "Sin trazabilidad del progreso de estudiantes",
        future: "Dashboard de impacto del Método Vórtex en tiempo real",
        color: "#93C5FD"
    },
    {
        icon: <Zap className="w-5 h-5" />,
        label: "LIDERAZGO TÉCNICO",
        today: "Carlos trabaja bajo estructura de agencia externa",
        future: "Carlos lidera el equipo técnico interno con infraestructura sólida",
        color: "#60A5FA"
    },
    {
        icon: <CheckCircle2 className="w-5 h-5" />,
        label: "COHERENCIA",
        today: "Paradoja: enseña estructura, opera en caos",
        future: "Coherencia total: la empresa vive lo que Claudia enseña",
        color: "#93C5FD"
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export default function VisionTransform() {
    return (
        <div className="px-6 md:px-16 py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#60A5FA]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a1a2e]/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            {/* Grid Pattern Background */}
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
                    Parte III — La Visión
                </p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl mx-auto">
                    La infraestructura que el
                    <span className="text-white opacity-40 italic"> movimiento merece.</span>
                </h2>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "96px" }}
                    viewport={{ once: true }}
                    className="h-1.5 bg-white/20 mx-auto rounded-full"
                />
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
            >
                {TRANSFORMATIONS.map((t, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants}
                        className="group relative bg-[#1a1a2e]/30 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:border-white/20 transition-all duration-500 overflow-hidden"
                    >
                        {/* Area Icon & Label */}
                        <div className="flex items-center gap-4 mb-8">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-black/10"
                                style={{ backgroundColor: `${t.color}15`, color: t.color }}
                            >
                                {t.icon}
                            </div>
                            <span className="text-[11px] font-mono tracking-[0.2em] font-bold text-white/80">
                                {t.label}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-6 relative">
                            {/* Today */}
                            <div className="relative pl-10">
                                <AlertCircle className="absolute left-0 top-0 w-6 h-6 text-white/10" />
                                <p className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase mb-2 font-bold">
                                    Hoy — La Realidad
                                </p>
                                <p className="text-white/40 text-sm leading-relaxed italic font-medium">
                                    "{t.today}"
                                </p>
                            </div>

                            {/* Arrow Indicator */}
                            <div className="flex items-center gap-4 py-2">
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/0 via-white/10 to-transparent" />
                                <TrendingUp className="w-4 h-4 text-white opacity-20" />
                                <div className="h-[1px] flex-1 bg-gradient-to-l from-white/0 via-white/10 to-transparent" />
                            </div>

                            {/* Future */}
                            <div className="relative pl-10 border-l-4 border-white/20 rounded-sm">
                                <CheckCircle className="absolute -left-[14px] top-6 w-6 h-6 text-white bg-[#183057] rounded-full border border-white/20 p-0.5" />
                                <div className="flex items-center gap-3 mb-2">
                                    <p className="text-[9px] font-mono tracking-[0.2em] text-white/80 uppercase font-black">
                                        En 18 meses — El Estándar
                                    </p>
                                </div>
                                <p className="text-white text-base lg:text-lg font-black leading-snug">
                                    {t.future}
                                </p>
                            </div>
                        </div>

                        {/* Hover accent */}
                        <div
                            className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                            style={{
                                background: `radial-gradient(circle at top right, ${t.color}, transparent 70%)`
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-20 text-center">
                <p className="text-[10px] text-white/20 font-mono tracking-[0.2em] uppercase">
                    Hacia una estructura de clase mundial — ASYGNUZ 2026
                </p>
            </div>
        </div>
    );
}
