"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./SolutionSection.module.css";

const pillars = [
    {
        title: "Software Core",
        desc: "Plataformas, SaaS e integraciones complejas. Arquitectura robusta, escalable y enfocada en conversiones ultrarrápidas.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
            </svg>
        ),
        colSpan: "col-span-1 md:col-span-2",
        bg: "bg-gradient-to-br from-cyan-950/40 to-black border-cyan-900/50"
    },
    {
        title: "Autonomous AI",
        desc: "Agentes de Inteligencia Artificial operativos 24/7. Automatización de flujos y atención pre-calificada sin intervención humana.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                <rect x="2" y="10" width="20" height="10" rx="2" ry="2"/>
                <path d="M12 10V4c0-1.1-.9-2-2-2H4"/>
                <circle cx="12" cy="14" r="2"/>
            </svg>
        ),
        colSpan: "col-span-1",
        bg: "bg-gradient-to-bl from-emerald-950/40 to-black border-emerald-900/50"
    },
    {
        title: "Growth & MarTech",
        desc: "Adquisición técnica de alto rendimiento, optimización de conversión (CRO) y orquestación de datos y píxeles.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
        ),
        colSpan: "col-span-1 md:col-span-3",
        bg: "bg-gradient-to-t from-purple-950/30 to-black border-purple-900/50"
    }
];

export default function SolutionSection() {
    const { ref, isVisible } = useInView();

    return (
        <section className={`py-24 bg-black text-white relative border-t border-gray-800 ${styles.solution}`} ref={ref}>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            
            <div className="container mx-auto px-6">
                <div className={`max-w-2xl mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        El Asygnuz Growth System
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Nuestra metodología patentada fusiona el desarrollo web de alta performance con ingeniería de adquisición y automatización con IA.
                    </p>
                </div>

                {/* Bento Box Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {pillars.map((pillar, i) => (
                        <div key={i} className={`p-8 rounded-3xl border ${pillar.bg} flex flex-col justify-between ${pillar.colSpan} hover:scale-[1.02] transition-transform duration-300 shadow-2xl`}>
                            <div className="mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-black border border-gray-800 flex items-center justify-center mb-6">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">{pillar.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{pillar.desc}</p>
                            </div>
                            <div className="mt-auto">
                                <div className="h-1 w-12 bg-gray-700 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
