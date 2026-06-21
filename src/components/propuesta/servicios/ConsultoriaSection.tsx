"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import InlineCTA from '@/components/propuesta/servicios/InlineCTA';

const AREAS = [
    {
        n: "01",
        title: "Gestión de Proyectos",
        price: "$500 USD / mes",
        items: [
            "Estructura del equipo y roles claros",
            "Tablero de proyectos activos y prioridades",
            "Sistema de reuniones efectivas",
            "Seguimiento de tareas y responsables",
            "Indicadores de cumplimiento y avance",
        ],
    },
    {
        n: "02",
        title: "Tecnología",
        price: "$500 USD / mes",
        items: [
            "Auditoría y limpieza de herramientas actuales",
            "CRM configurado y funcionando",
            "Automatizaciones de procesos repetitivos",
            "Integraciones entre plataformas",
            "Dashboard de métricas en tiempo real",
        ],
    },
    {
        n: "03",
        title: "Marketing RevOps",
        price: "$500 USD / mes",
        items: [
            "Estrategia de contenido orgánico mensual",
            "Montaje y optimización de campañas de pauta",
            "Flujos de captación y nutrición de leads",
            "Automatizaciones de DM / WhatsApp",
            "Revisión mensual de KPIs de marketing",
        ],
    },
];

export default function ConsultoriaSection() {
    return (
        <div className="px-6 md:px-12 py-16 w-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-14 max-w-3xl"
            >
                <p className="text-[10px] font-mono tracking-[0.5em] text-[#183057]/40 uppercase font-bold mb-4">
                    Servicio 01
                </p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#183057] leading-tight tracking-tight mb-5">
                    Consultoría
                </h2>
                <p className="text-base md:text-lg text-[#183057]/60 font-medium leading-relaxed">
                    Trabajamos contigo, no por ti. Te damos la estructura, las herramientas y el
                    acompañamiento para que tú y tu equipo construyan <span className="text-[#183057] font-bold">capacidad interna real</span>.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-6">
                    <span className="text-3xl font-black text-[#183057] tabular-nums">$500 USD</span>
                    <span className="text-xs font-mono text-[#183057]/40 uppercase tracking-wider">por área / mes</span>
                    <span className="text-[11px] font-mono text-[#183057]/40 bg-[#183057]/5 px-3 py-1.5 rounded-full">
                        4 meses mín · 2 sesiones por área/mes · 45–60 min c/u
                    </span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {AREAS.map((area, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.12 }}
                        className="bg-[#F8FAFC] rounded-[2rem] p-8 border border-[#183057]/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_18px_40px_rgba(24,48,87,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
                    >
                        <div className="flex items-baseline justify-between mb-5">
                            <span className="text-4xl font-black text-[#183057]/15 tabular-nums">{area.n}</span>
                            <span className="text-[11px] font-mono text-[#183057]/40 uppercase tracking-wider">{area.price}</span>
                        </div>
                        <h3 className="text-2xl font-black text-[#183057] mb-6 tracking-tight">{area.title}</h3>
                        <ul className="space-y-3 flex-1">
                            {area.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-3 text-sm text-[#183057]/70 font-medium">
                                    <Check className="w-4 h-4 text-[#183057] shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-[2rem] bg-[#183057] p-8 md:p-10 text-center text-white relative overflow-hidden"
            >
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                <p className="relative z-10 text-[10px] font-mono tracking-[0.3em] uppercase text-white/50 font-bold mb-3">
                    Total 3 áreas
                </p>
                <p className="relative z-10 text-2xl md:text-4xl font-black tabular-nums">
                    $1,500 USD / mes
                    <span className="text-white/50 text-lg md:text-2xl font-bold"> · $6,000 USD por los 4 meses completos</span>
                </p>
            </motion.div>

            <div className="mt-8">
                <InlineCTA
                    variant="dark"
                    text="¿Prefieres construir capacidad interna con nuestra guía? Hablemos de Consultoría."
                    buttonLabel="Quiero este modelo"
                />
            </div>
        </div>
    );
}
