"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const PHASES = [
    {
        letter: 'A', title: "AUDIT", phase: "BUILD · Mes 1", color: "#3B82F6",
        content: "Diagnóstico 360° del ecosistema digital. Customer Journey Map. Inventario completo de herramientas, accesos y riesgos operativos.",
        deliverables: ["Mapa de riesgos", "Customer Journey Map", "Inventario de tools", "Informe de fragilidad"]
    },
    {
        letter: 'S', title: "SOVEREIGNTY", phase: "BUILD · Meses 1-2", color: "#6366F1",
        content: "Transferencia real de todos los accesos a tu control. Backup estructurado de datos y activos. Política de soberanía digital activa.",
        deliverables: ["Transferencia de accesos", "Respaldo estructurado", "Política de datos", "Reserva de Oxígeno"]
    },
    {
        letter: 'C', title: "CORE SYSTEM", phase: "BUILD · Meses 2-4", color: "#8B5CF6",
        content: "CRM nuevo implementado desde cero. Chatbot con calificación de leads. Sistema de comisiones automatizado. Dashboard en tiempo real.",
        deliverables: ["CRM configurado", "Chatbot IA leads", "Comisiones automáticas", "Dashboard en vivo"]
    },
    {
        letter: 'E', title: "ECOSYSTEM", phase: "OPERATE · Meses 4-8", color: "#2563EB",
        content: "Estrategia orgánica activa. Potenciamos la marca personal del equipo. Sistema de atribución clara de leads por canal y contenido.",
        deliverables: ["Estrategia orgánica", "Marca personal equipo", "Atribución de leads", "Métricas unificadas"]
    },
    {
        letter: 'N', title: "NETWORK SCALE", phase: "OPERATE · Meses 8-14", color: "#1D4ED8",
        content: "El equipo genera sus propios leads de forma autónoma. Automatizaciones profundas de WhatsApp. El fundador opera en su zona de genio.",
        deliverables: ["Adquisición autónoma", "Automatización WhatsApp", "Gestión delegada", "Flujo de trabajo estable"]
    },
    {
        letter: 'D', title: "DIGITAL HANDOFF", phase: "TRANSFER · Mes 14+", color: "#10B981",
        content: "Tu agencia interna opera con autonomía. El área técnica queda liderada internamente. Asygnuz permanece en gobernanza trimestral.",
        deliverables: ["Agencia in-house activa", "Área TIC interna", "Gobernanza trimestral", "Manuales operativos"]
    },
];

const STAGES = [
    { stage: "BUILD", period: "Meses 1–6" },
    { stage: "OPERATE", period: "Meses 7–14" },
    { stage: "TRANSFER", period: "Mes 14+" },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function AscendMethod() {
    return (
        <div className="px-6 md:px-12 py-20 w-full max-w-6xl mx-auto flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-16 space-y-4"
            >
                <p className="text-[10px] font-mono tracking-[0.5em] text-[#183057]/40 uppercase font-bold">
                    Full Management · Cómo trabajamos
                </p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#183057] leading-tight tracking-tight">
                    Método A.S.C.E.N.D.
                </h2>
                <p className="text-base md:text-lg text-[#183057]/50 max-w-2xl mx-auto font-medium leading-relaxed">
                    Cada mes tiene un foco claro, entregables concretos y un resultado medible.
                    Del diagnóstico inicial a la transferencia total — sin etapas vagas.
                </p>
            </motion.div>

            {/* Stage chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                {STAGES.map((s, i) => (
                    <React.Fragment key={i}>
                        <div className="flex flex-col items-center px-5 py-3 rounded-2xl bg-white border border-[#183057]/10 shadow-sm">
                            <span className="text-sm font-black text-[#183057]">{s.stage}</span>
                            <span className="text-[10px] font-mono text-[#183057]/40 uppercase tracking-wider">{s.period}</span>
                        </div>
                        {i < STAGES.length - 1 && <span className="text-[#183057]/20 hidden sm:block">→</span>}
                    </React.Fragment>
                ))}
            </div>

            {/* Vertical steps */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-4xl mx-auto space-y-6 relative"
            >
                <div className="absolute left-[36px] md:left-[52px] top-8 bottom-8 w-1 bg-gradient-to-b from-[#183057]/10 via-[#183057]/20 to-[#059669]/30 hidden md:block rounded-full" />

                {PHASES.map((phase, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex flex-col md:flex-row gap-6 md:gap-10 items-start relative group"
                    >
                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 md:w-28 md:h-28 rounded-2xl md:rounded-3xl shadow-lg bg-white border-2 border-[#183057]/5 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:border-[#183057]/20 bg-gradient-to-b from-white to-[#F8FAFC]">
                            <span className="text-3xl md:text-5xl font-black bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to bottom, #183057, ${phase.color})` }}>
                                {phase.letter}
                            </span>
                        </div>

                        <div className="flex-1 bg-white p-8 md:p-10 rounded-[2rem] border border-[#183057]/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 group-hover:shadow-[0_15px_40px_rgba(24,48,87,0.06)] relative overflow-hidden group-hover:-translate-y-1">
                            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-[0.03] transition-opacity duration-300 group-hover:opacity-10" style={{ backgroundColor: phase.color }} />

                            <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between">
                                <h3 className="text-2xl md:text-3xl font-black text-[#1a1a2e] tracking-tight">{phase.title}</h3>
                                <span className="text-[10px] md:text-[11px] font-mono tracking-widest uppercase px-4 py-2 rounded-full border w-fit"
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
        </div>
    );
}
