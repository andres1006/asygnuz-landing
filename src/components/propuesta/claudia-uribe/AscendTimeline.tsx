"use client";

import React from 'react';
import { motion } from 'framer-motion';

const PHASES = [
    {
        letter: 'A', title: "AUDIT", phase: "BUILD · Mes 1", color: "#3B82F6",
        content: "Diagnóstico completo del ecosistema digital. Customer Journey Map actualizado y auditado. Inventario total de herramientas, accesos y riesgos operativos.",
        deliverables: ["Mapa de riesgos", "Customer Journey Map", "Inventario de tools", "Informe de fragilidad"]
    },
    {
        letter: 'S', title: "SOVEREIGNTY", phase: "BUILD · Meses 1-2", color: "#6366F1",
        content: "Transferencia real de accesos a tu control. Backup estructurado de toda la base de datos y activos. Activación de la 'Reserva de Oxígeno Operativa'.",
        deliverables: ["Transferencia de accesos", "Respaldo estructurado", "Política de datos", "Reserva de Oxígeno"]
    },
    {
        letter: 'C', title: "CORE SYSTEM", phase: "BUILD · Meses 2-4", color: "#8B5CF6",
        content: "Nuevo CRM implementado desde cero. Chatbot con calificación de leads real y asertiva. Sistema de comisiones automatizado. Dashboard consolidado en tiempo real.",
        deliverables: ["CRM configurado", "Chatbot IA conversacional", "Comisiones automáticas", "Dashboard en vivo"]
    },
    {
        letter: 'E', title: "ECOSYSTEM", phase: "OPERATE · Meses 4-8", color: "#2563EB",
        content: "Estrategia orgánica para Instagram fundamentada en 5 pilares clave. Potenciamos perfiles de coaches. Sistema de atribución clara de leads por coach.",
        deliverables: ["Estrategia Instagram", "Marca personal coaches", "Atribución de leads", "Métricas unificadas"]
    },
    {
        letter: 'N', title: "NETWORK SCALE", phase: "OPERATE+ · Meses 8-14", color: "#1D4ED8",
        content: "Coaches generando sus propios leads de forma autónoma. Automatizaciones profundas de WhatsApp. Objetivo cumplido: Claudia opera en su Zona de Genio, fuera de la operación diaria.",
        deliverables: ["Adquisición autónoma", "Automatización WhatsApp", "Gestión delegada", "Flujo de trabajo estable"]
    },
    {
        letter: 'D', title: "DIGITAL HANDOFF", phase: "TRANSFER · Mes 14+", color: "#10B981",
        content: "Tu propia agencia interna operando con autonomía y eficiencia. Carlos asume el rol formal como Tech Lead. Asygnuz permanece solo en gobernanza estratégica trimestral.",
        deliverables: ["Agencia in-house activa", "Área TIC in-house", "Gobernanza trimestral", "Manuales operativos"]
    },
];

const BOT_FEES = [
    { stage: "BUILD", period: "Meses 1-6", fee: "$2,000", color: "#4F46E5", desc: "Construcción Core" },
    { stage: "OPERATE", period: "Meses 7-12", fee: "$1,500", color: "#2563EB", desc: "Escalamiento" },
    { stage: "OPERATE+", period: "Meses 13-18", fee: "$1,200", color: "#1D4ED8", desc: "Autonomía" },
    { stage: "TRANSFER", period: "Mes 19+", fee: "$1,000", color: "#059669", desc: "Gobernanza" },
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
} as const;

export default function AscendTimeline() {
    return (
        <div className="px-6 md:px-12 py-20 w-full max-w-6xl mx-auto flex flex-col items-center">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-24 space-y-4"
            >
                <p className="text-[10px] font-mono tracking-[0.5em] text-[#183057]/40 uppercase font-bold">
                    Parte IV — El Modelo B.O.T. 2.0
                </p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#183057] leading-tight tracking-tight">
                    Control de Transferencia <br className="hidden md:block" /> Operativa.
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                    <span className="text-sm md:text-base font-semibold text-[#183057]/30 bg-white px-4 py-2 rounded-full shadow-sm border border-[#183057]/5">
                        Del acompañamiento estratégico
                    </span>
                    <span className="text-[#183057]/20 hidden md:block">→</span>
                    <span className="text-sm md:text-base font-bold text-[#183057] bg-[#183057]/5 px-4 py-2 rounded-full border border-[#183057]/10 shadow-sm shadow-[#183057]/5">
                        A la autonomía total in-house
                    </span>
                </div>
            </motion.div>

            {/* Vertical Steps */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-4xl mx-auto space-y-6 relative"
            >
                {/* Connecting Line */}
                <div className="absolute left-[36px] md:left-[52px] top-8 bottom-8 w-1 bg-gradient-to-b from-[#183057]/10 via-[#183057]/20 to-[#059669]/30 hidden md:block rounded-full shadow-[0_0_15px_rgba(24,48,87,0.05)]" />

                {PHASES.map((phase, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex flex-col md:flex-row gap-6 md:gap-10 items-start relative group"
                    >
                        {/* Letter Icon */}
                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 md:w-28 md:h-28 rounded-2xl md:rounded-3xl shadow-lg bg-white border-2 border-[#183057]/5 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:border-[#183057]/20 bg-gradient-to-b from-white to-[#F8FAFC]"
                            style={{ color: phase.color }}
                        >
                            <span className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-[#183057] to-[#183057]/40" style={{ backgroundImage: `linear-gradient(to bottom, #183057, ${phase.color})` }}>
                                {phase.letter}
                            </span>
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 bg-white p-8 md:p-10 rounded-[2rem] border border-[#183057]/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 group-hover:shadow-[0_15px_40px_rgba(24,48,87,0.06)] relative overflow-hidden group-hover:-translate-y-1">
                            {/* Color highlight blob */}
                            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-[0.03] transition-opacity duration-300 group-hover:opacity-10"
                                style={{ backgroundColor: phase.color }}
                            />

                            <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between">
                                <h3 className="text-2xl md:text-3xl font-black text-[#1a1a2e] tracking-tight">{phase.title}</h3>
                                <span className="text-[10px] md:text-[11px] font-mono tracking-widest uppercase px-4 py-2 rounded-full border"
                                    style={{ backgroundColor: `${phase.color}10`, color: phase.color, borderColor: `${phase.color}30` }}>
                                    {phase.phase}
                                </span>
                            </div>

                            <p className="text-base md:text-lg text-[#1a1a2e]/70 leading-relaxed mb-8 font-medium">
                                {phase.content}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#1a1a2e]/[0.02] p-5 rounded-2xl border border-[#1a1a2e]/[0.05]">
                                {phase.deliverables.map((d, index) => (
                                    <div key={index} className="flex items-center gap-3 text-sm text-[#1a1a2e]/70 font-semibold">
                                        <svg className="w-5 h-5 flex-shrink-0" style={{ color: phase.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        {d}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Fees Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full max-w-5xl mx-auto mt-32 bg-[#F8FAFC] p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(24,48,87,0.03)] border border-[#183057]/5 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#183057] blur-[150px] opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#183057] blur-[120px] opacity-[0.02] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 text-center mb-16">
                    <h3 className="text-3xl md:text-5xl font-black text-[#183057] mb-6 tracking-tight">El Precio de la <span className="opacity-40">Independencia</span></h3>
                    <p className="text-base md:text-lg text-[#183057]/50 max-w-2xl mx-auto leading-relaxed font-medium">
                        A diferencia de las agencias tradicionales de pago eterno, nuestro modelo asume la <span className="text-[#183057] font-bold italic">reducción del costo operativo</span> conforme tu Agencia In-House toma el control real.
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {BOT_FEES.map((fee, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 md:p-8 rounded-[2rem] border border-[#183057]/[0.05] text-center shadow-[0_10px_30px_rgba(0,0,0,0.01)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(24,48,87,0.05)] group"
                        >
                            <div className="w-full h-1.5 rounded-full mb-6 opacity-60" style={{ backgroundColor: fee.color }} />

                            <p className="text-[10px] font-mono tracking-[0.2em] mb-2 uppercase font-black" style={{ color: fee.color }}>{fee.stage}</p>
                            <p className="text-xs text-[#183057]/40 font-bold mb-6 h-8 flex items-center justify-center uppercase tracking-wider">{fee.desc}</p>

                            <div className="text-3xl md:text-4xl font-black text-[#183057] mb-2 tabular-nums">
                                {fee.fee}
                            </div>
                            <p className="text-[10px] text-[#183057]/30 font-mono tracking-wider bg-[#183057]/5 py-1.5 px-4 rounded-full inline-block mt-2 font-black uppercase">
                                {fee.period}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
