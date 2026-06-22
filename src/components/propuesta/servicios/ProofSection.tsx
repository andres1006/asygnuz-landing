"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AreaChart, Area, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

gsap.registerPlugin(ScrollTrigger);

const userGrowthData = [
    { day: 'D1', users: 20 }, { day: 'D3', users: 90 },
    { day: 'D6', users: 210 }, { day: 'D10', users: 485 },
    { day: 'D14', users: 755 }, { day: 'D17', users: 1040 },
    { day: 'D20', users: 1340 }
];

const sessionsData = [
    { day: 'Lun', sessions: 70 }, { day: 'Mar', sessions: 125 },
    { day: 'Mie', sessions: 185 }, { day: 'Jue', sessions: 140 },
    { day: 'Vie', sessions: 240 }, { day: 'Sab', sessions: 95 },
    { day: 'Dom', sessions: 125 }, { day: 'Lun2', sessions: 280 },
    { day: 'Mar2', sessions: 340 }, { day: 'Mie2', sessions: 200 }
];

export default function ProofSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [activeIndex, setActiveIndex] = useState(sessionsData.length - 1);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    containerRef.current?.querySelectorAll('.bento-counter').forEach((el, i) => {
                        const target = parseInt(el.getAttribute('data-value') || '0');
                        gsap.fromTo(el,
                            { innerText: 0 },
                            { innerText: target, duration: 2.5, snap: { innerText: 1 }, delay: i * 0.1, ease: "power3.out" }
                        );
                    });
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <div ref={containerRef} className="px-6 md:px-12 py-16 w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center mb-10 w-full">
                <p className="text-[10px] font-mono tracking-[0.4em] text-[#183057]/60 uppercase mb-3 font-bold">
                    Caso reciente · Cliente activo
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-[#183057] leading-tight flex items-center justify-center gap-3 flex-wrap">
                    20 días.
                    <span className="text-[#183057] opacity-60">Resultados reales.</span>
                </h2>
                <p className="text-sm md:text-base text-[#183057]/40 mt-4 max-w-xl mx-auto font-medium">
                    Implementación en vivo de Full Management. Tracción inicial de las primeras tres semanas de operación.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
                {/* AREA CHART: Users */}
                <div className="md:col-span-8 bg-white rounded-3xl p-6 border border-[#1a1a2e]/[0.04] shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col relative overflow-hidden min-h-[280px]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="flex justify-between items-start mb-2 z-10">
                        <div>
                            <p className="text-[11px] font-mono tracking-widest text-[#1a1a2e]/50 uppercase">Usuarios Únicos · Retención</p>
                            <div className="text-5xl font-bold text-[#1a1a2e] mt-1 tabular-nums">
                                <span className="bento-counter" data-value="1340">1340</span>
                            </div>
                        </div>
                        <div className="text-xs font-semibold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                            Live
                        </div>
                    </div>
                    <div className="flex-1 w-full min-h-[150px] mt-4 z-10">
                        {hasAnimated && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={userGrowthData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUsersSvc" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: '12px' }}
                                        cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                    <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsersSvc)" animationDuration={2500} animationEasing="ease-out" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Conversion ring */}
                <div className="md:col-span-4 bg-[#F8FAFC] rounded-3xl p-6 border border-[#183057]/10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#183057]/5 to-transparent opacity-50" />
                    <div className="relative z-10 text-center">
                        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#183057" strokeOpacity={0.05} strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#183057" strokeWidth="8" strokeLinecap="round"
                                    strokeDasharray="283" strokeDashoffset={hasAnimated ? 283 - (283 * 0.44) : 283}
                                    className="transition-all duration-[2.5s] ease-out" />
                            </svg>
                            <div className="text-4xl font-bold text-[#183057] tabular-nums">
                                <span className="bento-counter" data-value="44">44</span><span className="text-2xl text-[#183057]/40">%</span>
                            </div>
                        </div>
                        <p className="text-[11px] font-mono tracking-widest text-[#183057]/40 uppercase mt-4 font-bold">CTR Inicio → Formulario</p>
                        <p className="text-sm text-[#183057]/60 mt-1 font-black">200 leads centralizados en CRM</p>
                    </div>
                </div>

                {/* Bar chart: Sessions */}
                <div className="md:col-span-6 bg-white rounded-3xl p-6 border border-[#1a1a2e]/[0.04] shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-between min-h-[220px]">
                    <div>
                        <p className="text-[11px] font-mono tracking-widest text-[#1a1a2e]/50 uppercase">Asesorías + Sesiones Grupales</p>
                        <div className="text-3xl font-bold text-[#1a1a2e] mt-1 tabular-nums flex items-baseline gap-2">
                            <span className="bento-counter" data-value="1800">1,800</span>
                            <span className="text-sm font-normal text-[#1a1a2e]/40">total</span>
                        </div>
                    </div>
                    <div className="h-32 w-full mt-2">
                        {hasAnimated && (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sessionsData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                                    onMouseMove={(state) => { if (state.isTooltipActive) setActiveIndex(Number(state.activeTooltipIndex || 0)); }}
                                    onMouseLeave={() => setActiveIndex(sessionsData.length - 1)}>
                                    <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', fontSize: '12px' }} />
                                    <Bar dataKey="sessions" radius={[4, 4, 4, 4]} animationDuration={2000}>
                                        {sessionsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === activeIndex ? '#183057' : '#18305720'} className="transition-all duration-300" />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Countries */}
                <div className="md:col-span-3 bg-gradient-to-br from-[#F8FAFC] to-white rounded-3xl p-6 border border-[#183057]/10 flex flex-col justify-center items-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#183057]/5 flex items-center justify-center mb-3 text-[#183057]/60">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" /></svg>
                    </div>
                    <div className="text-3xl font-bold text-[#183057] tabular-nums">
                        <span className="bento-counter" data-value="11">11</span>
                    </div>
                    <p className="text-[11px] font-mono tracking-widest text-[#183057]/40 uppercase mt-1 font-bold">Países Alcanzados</p>
                </div>

                {/* Integrations */}
                <div className="md:col-span-3 bg-gradient-to-br from-white to-[#F8FAFC] border border-[#183057]/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="text-4xl font-bold text-[#183057] tabular-nums mb-1">
                        <span className="bento-counter" data-value="6">6</span>
                    </div>
                    <p className="text-[11px] font-mono tracking-widest text-[#183057]/40 uppercase z-10 font-bold">Integraciones Activas</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-1 z-10">
                        {['CRM', 'Calendar', 'Meta', 'WhatsApp'].map((tool) => (
                            <span key={tool} className="text-[9px] bg-[#183057]/10 px-2 py-0.5 rounded-full text-[#183057]/60 font-bold">{tool}</span>
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-center text-sm md:text-base text-[#183057]/50 italic font-medium mt-10 max-w-2xl">
                &ldquo;Construimos el sistema. Entregamos el control. Los resultados hablan solos.&rdquo;
            </p>
        </div>
    );
}
