"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const METRICS = [
    { value: 797, label: "Usuarios totales", size: "col-span-2" },
    { value: 18, label: "Leads generados", size: "col-span-1" },
    { value: 44, suffix: "%", label: "Inicio de formulario", size: "col-span-1" },
    { value: 31, label: "Países alcanzados", size: "col-span-1" },
    { value: 22, label: "Reservas registradas", size: "col-span-1" },
    { value: 6, label: "Integraciones activas", size: "col-span-1" },
    { value: 2, label: "Landing pages live", size: "col-span-1" },
    { value: 20, label: "Días de trabajo pro bono", size: "col-span-2", highlight: true },
];

export default function Chapter1Bento() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".counter", {
                innerText: 0,
                duration: 2,
                snap: { innerText: 1 },
                stagger: 0.1,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center p-8 md:p-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
                {METRICS.map((metric, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`${metric.size} p-8 rounded-xl backdrop-blur-xl border border-[#183057]/10 flex flex-col justify-center items-center text-center space-y-2 ${metric.highlight ? 'bg-[#183057] border-[#183057]/30 shadow-xl' : 'bg-[#F8FAFC]'
                            }`}
                    >
                        <div className={`text-4xl md:text-6xl font-black flex items-baseline ${metric.highlight ? 'text-white' : 'text-[#183057]'}`}>
                            <span className="counter">{metric.value}</span>
                            {metric.suffix && <span className="text-2xl ml-1">{metric.suffix}</span>}
                        </div>
                        <div className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono font-bold ${metric.highlight ? 'text-white/60' : 'text-[#183057]/40'}`}>
                            {metric.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="fixed bottom-12 right-12 text-[#183057]/40 font-mono text-[10px] font-bold tracking-[0.2em] flex items-center gap-2"
            >
                SCROLL PARA CONTINUAR <span className="animate-bounce">↓</span>
            </motion.div>
        </div>
    );
}
