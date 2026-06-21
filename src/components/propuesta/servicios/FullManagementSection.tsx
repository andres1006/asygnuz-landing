"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Server, Megaphone, TrendingUp, Check, ShieldCheck } from 'lucide-react';

const LADDER = [
    { period: "Meses 1–6", fee: "$2,000", desc: "Arranque y construcción. Operación completa a cargo nuestro.", color: "#4F46E5" },
    { period: "Meses 7–12", fee: "$1,500", desc: "El equipo ya opera. Ejecutamos y entrenamos para la entrega.", color: "#2563EB" },
    { period: "Meses 13–18", fee: "$1,200", desc: "Autonomía. Tu equipo toma el control, nosotros supervisamos.", color: "#1D4ED8" },
    { period: "Mes 19+", fee: "$1,000", desc: "Gobernanza trimestral. Tu agencia interna opera sola.", color: "#059669" },
];

const PILLARS = [
    {
        icon: <Server className="w-5 h-5" />,
        label: "IT & Tecnología",
        items: ["CRM activo y actualizado", "Automatizaciones de procesos", "Integraciones entre plataformas", "Dashboard de métricas en vivo", "Soporte técnico continuo"],
    },
    {
        icon: <Megaphone className="w-5 h-5" />,
        label: "Marketing & Contenido",
        items: ["Pauta paga (Meta / Google)", "Contenido orgánico mensual", "Gestión de comunidad", "Flujos de DM y WhatsApp", "Diseño gráfico y video"],
    },
    {
        icon: <TrendingUp className="w-5 h-5" />,
        label: "Crecimiento Comercial",
        items: ["Pipeline de ventas activo", "Seguimiento de leads", "Guiones y flujos de cierre", "Reportes de conversión", "Estrategia de retención"],
    },
];

const FOCUS = ["Tus clientes", "Tu producto / servicio", "Decisiones estratégicas", "Tu zona de genio", "Crecer el negocio"];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function FullManagementSection() {
    return (
        <div className="px-6 md:px-12 py-24 w-full max-w-6xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#60A5FA]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 max-w-3xl relative z-10"
            >
                <p className="text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase font-bold mb-4">
                    Servicio 02
                </p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-5">
                    Full Management
                </h2>
                <p className="text-base md:text-lg text-white/60 font-medium leading-relaxed">
                    Nos convertimos en tu equipo de operaciones. Gestionamos IT, marketing y crecimiento
                    comercial — con un precio que <span className="text-white font-bold">baja conforme el programa avanza</span> y tu equipo gana autonomía.
                </p>
            </motion.div>

            {/* Investment ladder */}
            <p className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase font-bold mb-6 relative z-10">
                Estructura de inversión
            </p>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 relative z-10"
            >
                {LADDER.map((step, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants}
                        className="bg-white/[0.04] backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/25 transition-all duration-500 hover:-translate-y-1"
                    >
                        <div className="w-full h-1.5 rounded-full mb-5 opacity-70" style={{ backgroundColor: step.color }} />
                        <p className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase font-bold mb-2">{step.period}</p>
                        <p className="text-4xl font-black text-white tabular-nums mb-1">{step.fee}<span className="text-base font-medium text-white/40"> /mes</span></p>
                        <p className="text-xs text-white/50 font-medium leading-relaxed mt-3">{step.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* What we manage */}
            <p className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase font-bold mb-6 relative z-10">
                Qué gestionamos en tu negocio
            </p>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10"
            >
                {PILLARS.map((p, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants}
                        className="bg-white/[0.04] backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 hover:border-white/25 transition-all duration-500"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-white">{p.icon}</div>
                            <h3 className="text-base font-black text-white tracking-tight uppercase">{p.label}</h3>
                        </div>
                        <ul className="space-y-3">
                            {p.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-3 text-sm text-white/70 font-medium">
                                    <Check className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>

            {/* You focus on */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-[2rem] bg-white/[0.04] border border-white/10 p-8 mb-12 relative z-10"
            >
                <p className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase font-bold mb-5">Tú te enfocas en:</p>
                <div className="flex flex-wrap gap-3">
                    {FOCUS.map((f, i) => (
                        <span key={i} className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-semibold border border-white/10">
                            {f}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Guarantee */}
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-[2rem] bg-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10"
            >
                <div className="w-14 h-14 rounded-2xl bg-[#183057]/5 flex items-center justify-center text-[#183057] shrink-0">
                    <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-[10px] font-mono tracking-[0.3em] text-[#183057]/40 uppercase font-bold mb-2">
                        Garantía de resultado
                    </p>
                    <p className="text-base md:text-lg text-[#183057]/80 font-medium leading-relaxed">
                        Al finalizar el programa medimos los KPIs firmados en el contrato. Si no se alcanza el objetivo,
                        el contrato se extiende por el porcentaje faltante en meses — <span className="text-[#183057] font-bold">sin ningún costo extra.</span>
                        Los KPIs se definen en la primera sesión de diagnóstico y se revisan mensualmente.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
