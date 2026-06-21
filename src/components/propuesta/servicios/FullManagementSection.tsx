"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Server, Megaphone, TrendingUp, Check, ShieldCheck } from 'lucide-react';
import InlineCTA from '@/components/propuesta/servicios/InlineCTA';

const PHASES = [
    {
        n: "01",
        title: "Construcción",
        period: "Meses 1–6",
        fee: "$2,000",
        weDo: "Montamos CRM, automatizaciones, pauta y procesos. Operamos todo nosotros.",
        youGet: "Tu sistema operativo digital funcionando, sin que tengas que ejecutarlo.",
        control: 100,
    },
    {
        n: "02",
        title: "Operación y entrenamiento",
        period: "Meses 7–12",
        fee: "$1,500",
        weDo: "Seguimos ejecutando, pero empezamos a entrenar a tu equipo en cada proceso.",
        youGet: "Tu equipo aprende a usar el sistema mientras los resultados siguen corriendo.",
        control: 70,
    },
    {
        n: "03",
        title: "Transición",
        period: "Meses 13–18",
        fee: "$1,200",
        weDo: "Tu equipo toma el control del día a día. Nosotros supervisamos y corregimos.",
        youGet: "Autonomía real: tu gente opera y tú dejas de depender de un proveedor.",
        control: 35,
    },
    {
        n: "04",
        title: "Autonomía",
        period: "Mes 19 en adelante",
        fee: "$1,000",
        weDo: "Gobernanza trimestral: auditamos, optimizamos y marcamos el rumbo estratégico.",
        youGet: "Tu propia agencia interna operando sola. La estructura ya es tuya.",
        control: 10,
    },
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

            {/* Phased roadmap */}
            <div className="mb-6 relative z-10">
                <p className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase font-bold mb-2">
                    Cómo funciona, fase por fase
                </p>
                <p className="text-sm text-white/55 font-medium leading-relaxed max-w-2xl">
                    Un único objetivo guía las cuatro fases: pasar de <span className="text-white font-bold">&quot;nosotros operamos&quot;</span> a
                    <span className="text-white font-bold"> &quot;tu equipo opera solo&quot;</span>. Por eso la inversión baja a medida que avanzas:
                    estás comprando autonomía, no dependencia.
                </p>
            </div>

            {/* Control transfer legend */}
            <div className="flex items-center gap-4 mb-8 relative z-10 text-[10px] font-mono uppercase tracking-[0.15em]">
                <span className="flex items-center gap-2 text-white/60">
                    <span className="w-3 h-3 rounded-sm bg-[#93C5FD]" /> Opera ASYGNUZ
                </span>
                <span className="flex items-center gap-2 text-white/60">
                    <span className="w-3 h-3 rounded-sm bg-[#34D399]" /> Opera tu equipo
                </span>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="relative z-10 mb-12 flex flex-col gap-4"
            >
                {PHASES.map((p, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants}
                        className="group bg-white/[0.04] backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/10 hover:border-white/25 transition-all duration-500"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                            {/* Phase number + meta */}
                            <div className="lg:w-52 shrink-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl font-black text-white/20 tabular-nums">{p.n}</span>
                                    <div>
                                        <p className="text-base font-black text-white leading-tight">{p.title}</p>
                                        <p className="text-[10px] font-mono tracking-[0.15em] text-white/40 uppercase">{p.period}</p>
                                    </div>
                                </div>
                                <p className="text-2xl font-black text-white tabular-nums">
                                    {p.fee}<span className="text-sm font-medium text-white/40"> /mes</span>
                                </p>
                            </div>

                            {/* What we do / what you get */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <p className="text-[9px] font-mono tracking-[0.2em] text-[#93C5FD] uppercase font-bold mb-1.5">
                                        Qué hacemos
                                    </p>
                                    <p className="text-sm text-white/65 font-medium leading-relaxed">{p.weDo}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-mono tracking-[0.2em] text-[#34D399] uppercase font-bold mb-1.5">
                                        Qué logras tú
                                    </p>
                                    <p className="text-sm text-white/80 font-semibold leading-relaxed">{p.youGet}</p>
                                </div>
                            </div>
                        </div>

                        {/* Control transfer bar */}
                        <div className="mt-6 pt-5 border-t border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">Quién opera</span>
                                <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase tabular-nums">
                                    {p.control}% nosotros · {100 - p.control}% tu equipo
                                </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-[#34D399]/30 overflow-hidden flex">
                                <div className="h-full bg-[#93C5FD]" style={{ width: `${p.control}%` }} />
                            </div>
                        </div>
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

            <div className="mt-8 relative z-10">
                <InlineCTA
                    variant="light"
                    text="¿Quieres delegar la operación y quedarte con la estructura? Hablemos de Full Management."
                    buttonLabel="Quiero este modelo"
                />
            </div>
        </div>
    );
}
