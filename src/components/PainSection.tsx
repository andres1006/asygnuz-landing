"use client";

import { useInView } from "@/hooks/useInView";
import styles from "./PainSection.module.css";

const pains = [
    {
        title: "Agencias Genéricas",
        desc: "Contratar una agencia para hacer posts no sirve si tu software no retiene al cliente.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
        )
    },
    {
        title: "Software Inútil",
        desc: "Tu sitio web es un gasto si no está optimizado para capturar, calificar y convertir leads de forma autónoma.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
        )
    }
];

export default function PainSection() {
    const { ref, isVisible } = useInView();

    return (
        <section className={`py-24 bg-black text-white relative border-t border-gray-800 ${styles.pain}`} ref={ref}>
            <div className="container mx-auto px-6">
                <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-red-400 font-mono text-sm tracking-widest uppercase mb-4">El Problema Real</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        El marketing sin tecnología es ruido. <br/>
                        <span className="text-gray-500">La tecnología sin ventas es un gasto.</span>
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Contratar una agencia para hacer posts no sirve si tu software no retiene al cliente. Necesitas <strong className="text-white">Growth Engineering</strong>: la fusión perfecta entre código limpio, IA autónoma y embudos de alta conversión.
                    </p>
                </div>

                <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {pains.map((pain, i) => (
                        <div key={i} className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl hover:border-gray-700 transition-colors">
                            <div className="bg-red-950/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-red-900/50">
                                {pain.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{pain.title}</h3>
                            <p className="text-gray-400">{pain.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}