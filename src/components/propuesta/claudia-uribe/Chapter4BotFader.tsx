"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Chapter4BotFader() {
    const [value, setValue] = useState(0);

    const opacityAsygnuz = 1 - (value / 100);
    const opacityTeam = value / 100;

    // Chart Curves Logic
    const points = 10;
    const costCurve = useMemo(() => {
        return Array.from({ length: points + 1 }, (_, i) => {
            const x = (i / points) * 100;
            // Exponential-like decrease for cost
            const y = 80 * Math.pow(0.2, i / points);
            return { x, y: 85 - y }; // Inverse for SVG coordinate
        });
    }, []);

    const knowledgeCurve = useMemo(() => {
        return Array.from({ length: points + 1 }, (_, i) => {
            const x = (i / points) * 100;
            // S-curve for knowledge accumulation
            const t = i / points;
            const y = 80 / (1 + Math.exp(-10 * (t - 0.5)));
            return { x, y: 85 - y };
        });
    }, []);

    const toPath = (curve: { x: number, y: number }[]) =>
        `M ${curve[0].x},${curve[0].y} ` + curve.slice(1).map(p => `L ${p.x},${p.y}`).join(' ');

    const costPath = useMemo(() => toPath(costCurve), [costCurve]);
    const knowledgePath = useMemo(() => toPath(knowledgeCurve), [knowledgeCurve]);

    return (
        <div className="w-full bg-white flex flex-col items-center justify-center p-8 md:p-16 space-y-12 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#183057]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2C4B7D]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="text-center space-y-6 relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183057]/5 border border-[#183057]/10">
                    <TrendingUp className="w-3 h-3 text-[#183057]" />
                    <span className="text-[#183057] font-mono text-[9px] tracking-[0.3em] uppercase font-bold">Simulador de Transferencia</span>
                </div>
                <h2 className="text-[#183057] text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
                    Toma el <span className="text-[#183057] opacity-60 italic">control.</span>
                </h2>
                <p className="text-[#183057]/60 text-sm md:text-lg font-medium leading-relaxed">
                    Visualiza cómo la inversión externa disminuye mientras tu <span className="text-[#183057] font-bold">soberanía y capacidad</span> interna despegan.
                </p>
            </div>

            {/* CHART SECTION */}
            <div className="w-full max-w-4xl bg-[#F8FAFC] rounded-[3rem] p-10 border border-[#183057]/5 shadow-[0_20px_60px_rgba(24,48,87,0.03)] relative z-10">
                <div className="relative h-48 md:h-64 w-full mb-8">
                    {/* SVG Chart */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                        {/* Grid Lines */}
                        <line x1="0" y1="85" x2="100" y2="85" stroke="#183057" strokeWidth="0.1" strokeDasharray="1,1" opacity="0.1" />
                        <line x1="0" y1="45" x2="100" y2="45" stroke="#183057" strokeWidth="0.1" strokeDasharray="1,1" opacity="0.1" />
                        <line x1="0" y1="5" x2="100" y2="5" stroke="#183057" strokeWidth="0.1" strokeDasharray="1,1" opacity="0.1" />

                        {/* Cost Curve (Faders Out) */}
                        <motion.path
                            d={costPath}
                            fill="none"
                            stroke="#183057"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            opacity="0.4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <path
                            d={`${costPath} L 100,85 L 0,85 Z`}
                            fill="url(#costGradient)"
                            opacity="0.05"
                        />

                        {/* Knowledge Curve (Rises) */}
                        <motion.path
                            d={knowledgePath}
                            fill="none"
                            stroke="#183057"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                        />
                        <path
                            d={`${knowledgePath} L 100,85 L 0,85 Z`}
                            fill="url(#knowledgeGradient)"
                            opacity="0.1"
                        />

                        {/* Vertical Progress Line */}
                        <motion.line
                            x1={value}
                            y1="0"
                            x2={value}
                            y2="85"
                            stroke="#183057"
                            strokeWidth="0.4"
                            strokeDasharray="2,2"
                            opacity="0.2"
                        />
                        <motion.circle
                            cx={value}
                            cy={85 - (80 * Math.pow(0.2, value / 100))}
                            r="1.2"
                            fill="white"
                            stroke="#183057"
                            strokeWidth="0.5"
                            opacity="0.6"
                        />
                        <motion.circle
                            cx={value}
                            cy={85 - (80 / (1 + Math.exp(-10 * (value / 100 - 0.5))))}
                            r="2"
                            fill="#183057"
                            stroke="white"
                            strokeWidth="0.5"
                            className="shadow-xl"
                        />

                        {/* Gradients */}
                        <defs>
                            <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#183057" />
                                <stop offset="100%" stopColor="#183057" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="knowledgeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#183057" />
                                <stop offset="100%" stopColor="#183057" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Labels */}
                    <div className="absolute left-0 top-0 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#183057] opacity-40" />
                        <span className="text-[10px] font-mono font-bold text-[#183057]/40">INVERSIÓN ASYGNUZ</span>
                    </div>
                    <div className="absolute right-0 top-0 flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#183057] text-right">CAPACIDAD INTERNA</span>
                        <div className="w-2 h-2 rounded-full bg-[#183057]" />
                    </div>
                </div>

                {/* Slider Control */}
                <div className="space-y-6">
                    <div className="flex justify-between items-end mb-2">
                        <div className="space-y-1">
                            <span className="text-[9px] font-mono tracking-[0.2em] text-[#183057]/40 uppercase font-black">Progreso de Transferencia</span>
                            <h4 className="text-2xl font-black text-[#183057]">MES {Math.min(18, Math.floor((value / 100) * 17) + 1)}</h4>
                        </div>
                        <div className="text-right">
                            <span className="text-[9px] font-mono tracking-[0.2em] text-[#183057]/40 uppercase font-black">Estatus</span>
                            <p className="text-xs font-bold text-[#183057]">
                                {value < 30 ? 'INICIO' : value < 80 ? 'TRANSFERENCIA' : 'SOBERANÍA'}
                            </p>
                        </div>
                    </div>

                    <div className="relative w-full h-12 flex items-center group">
                        <div className="absolute w-full h-2 bg-[#183057]/5 rounded-full" />
                        <motion.div
                            className="absolute h-2 bg-[#183057]"
                            style={{ width: `${value}%` }}
                        />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="0.1"
                            value={value}
                            onChange={(e) => setValue(parseFloat(e.target.value))}
                            className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        <motion.div
                            className="absolute w-10 h-10 bg-white border-4 border-[#183057] rounded-2xl shadow-xl z-10 pointer-events-none flex items-center justify-center group-active:scale-95 transition-transform"
                            style={{ left: `calc(${value}% - 20px)` }}
                        >
                            <ArrowRight className="w-5 h-5 text-[#183057]" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* COMPARISON CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl relative z-10">
                {/* Asygnuz Side */}
                <motion.div
                    style={{ opacity: Math.max(0.4, 1 - value / 100), scale: Math.max(0.95, 1 - value / 200) }}
                    className="bg-white rounded-3xl p-8 border border-[#183057]/10 flex flex-col items-center text-center space-y-6 shadow-sm"
                >
                    <div className="w-16 h-16 rounded-2xl bg-[#183057]/5 flex items-center justify-center text-[#183057]/40">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-[10px] font-mono tracking-[0.3em] text-[#183057]/40 font-bold uppercase mb-2">Asygnuz Leadership</p>
                        <p className="text-3xl font-black text-[#183057] tabular-nums">
                            $2,000 <span className="text-sm font-medium opacity-20">USD</span>
                        </p>
                    </div>
                    <p className="text-[#183057]/40 text-xs leading-relaxed max-w-[200px]">
                        Estructura táctica, supervisión técnica y arquitectura robusta.
                    </p>
                </motion.div>

                {/* Team Side */}
                <motion.div
                    style={{ opacity: Math.max(0.4, value / 100), scale: Math.max(0.95, 0.95 + value / 2000) }}
                    className={`bg-white rounded-3xl p-8 border transition-all duration-500 flex flex-col items-center text-center space-y-6 ${value > 80 ? 'border-[#183057] shadow-2xl shadow-[#183057]/10' : 'border-[#183057]/5 shadow-sm'}`}
                >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 ${value > 80 ? 'bg-[#183057] text-white' : 'bg-[#183057]/5 text-[#183057]/20'}`}>
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <p className={`text-[10px] font-mono tracking-[0.3em] font-bold uppercase mb-2 ${value > 80 ? 'text-[#183057]' : 'text-[#183057]/20'}`}>Tu Equipo Interno</p>
                        <p className={`text-3xl font-black tabular-nums transition-colors duration-500 ${value > 80 ? 'text-[#183057]' : 'text-[#183057]/10'}`}>
                            {value > 80 ? '$1,000' : '$ 0'} <span className="text-sm font-medium opacity-20">USD</span>
                        </p>
                    </div>
                    <p className={`text-xs leading-relaxed max-w-[200px] transition-colors duration-500 ${value > 80 ? 'text-[#183057]/60' : 'text-[#183057]/20'}`}>
                        Capacidad interna soberana operando los sistemas con autonomía.
                    </p>
                </motion.div>
            </div>

            {/* Bottom Status Message */}
            <div className="max-w-3xl text-center py-8 border-t border-[#183057]/5 w-full relative z-10">
                <AnimatePresence mode="wait">
                    {value < 30 ? (
                        <motion.p key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-[#183057]/40 text-xs md:text-sm font-mono tracking-[0.2em] font-bold uppercase">
                            <span className="text-[#183057]">Paso 1:</span> Estabilizamos la arquitectura digital y aseguramos tu soberanía.
                        </motion.p>
                    ) : value < 80 ? (
                        <motion.p key="2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-[#183057]/60 text-xs md:text-sm font-mono tracking-[0.2em] font-bold uppercase">
                            <span className="text-[#183057]">Paso 2:</span> Construimos los sistemas y progresamos en la transferencia táctica.
                        </motion.p>
                    ) : (
                        <motion.p key="3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-[#183057] text-xs md:text-sm font-mono tracking-[0.2em] font-black uppercase">
                            <span className="bg-[#183057] text-white px-2 py-0.5 rounded mr-2">SOBERANÍA TOTAL</span> Tu equipo opera el motor, Asygnuz solo supervisa.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
