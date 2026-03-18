"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '@/lib/propuesta/audio-manager';
import Chapter4BotFader from './Chapter4BotFader';

export default function Chapter4Doors() {
    const [phase, setPhase] = useState<'doors' | 'fader'>('doors');

    const handleDoorClick = (door: string) => {
        if (door === 'B') {
            audioManager.playDrone();
            setPhase('fader');
        } else {
            audioManager.playPing();
        }
    };

    return (
        <div className="h-screen bg-white relative overflow-hidden">
            <AnimatePresence mode="wait">
                {phase === 'doors' ? (
                    <motion.div
                        key="doors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
                        transition={{ duration: 1 }}
                        className="h-full flex flex-col items-center justify-center space-y-12 px-8"
                    >
                        <div className="text-center space-y-2">
                            <h2 className="text-4xl md:text-6xl font-serif text-[#183057] uppercase tracking-widest">Las Tres Puertas</h2>
                            <p className="text-[#183057]/40 font-mono text-[10px] tracking-[0.3em] font-bold uppercase">Cómo eliges construir el futuro</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-end">
                            {/* Puerta A */}
                            <div
                                onClick={() => handleDoorClick('A')}
                                className="group relative w-48 h-72 border border-[#183057]/10 hover:border-[#183057]/40 cursor-pointer transition-colors flex flex-col items-center justify-center space-y-4 rounded-xl"
                            >
                                <div className="absolute inset-0 bg-[#183057] opacity-0 group-hover:opacity-5 transition-opacity rounded-xl" />
                                <span className="text-[#183057]/10 font-serif text-4xl group-hover:text-[#183057]/40 transition-colors">A</span>
                                <div className="absolute bottom-4 left-0 w-full text-center px-4">
                                    <p className="text-[8px] font-mono text-[#183057]/40 tracking-[0.2em] group-hover:text-[#183057] transition-colors uppercase">Outsourcing Permanente</p>
                                </div>
                            </div>

                            {/* Puerta B */}
                            <div
                                onClick={() => handleDoorClick('B')}
                                className="group relative w-64 h-96 border border-[#183057]/20 hover:border-[#183057] cursor-pointer transition-all scale-105 shadow-[0_20px_50px_rgba(24,48,87,0.05)] flex flex-col items-center justify-center space-y-6 rounded-2xl bg-white"
                            >
                                <div className="absolute inset-0 bg-[#183057] opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl" />
                                <span className="text-[#183057]/20 font-serif text-6xl group-hover:text-[#183057] transition-colors">B</span>
                                <div className="absolute bottom-8 left-0 w-full text-center px-6">
                                    <p className="text-[10px] font-mono text-[#183057] tracking-[0.3em] font-black uppercase">Método B.O.T. 2.0</p>
                                    <p className="text-[8px] font-mono text-[#183057]/40 tracking-[0.1em] mt-2 uppercase">Construye tu propia agencia</p>
                                </div>
                                <div className="absolute -top-4 px-3 py-1 bg-[#183057] text-white font-mono text-[9px] font-bold tracking-widest animate-pulse rounded-full">
                                    RECOMENDADO
                                </div>
                            </div>

                            {/* Puerta C */}
                            <div
                                onClick={() => handleDoorClick('C')}
                                className="group relative w-48 h-72 border border-[#183057]/10 hover:border-[#183057]/40 cursor-pointer transition-colors flex flex-col items-center justify-center space-y-4 rounded-xl"
                            >
                                <div className="absolute inset-0 bg-[#183057] opacity-0 group-hover:opacity-5 transition-opacity rounded-xl" />
                                <span className="text-[#183057]/10 font-serif text-4xl group-hover:text-[#183057]/40 transition-colors">C</span>
                                <div className="absolute bottom-4 left-0 w-full text-center px-4">
                                    <p className="text-[8px] font-mono text-[#183057]/40 tracking-[0.2em] group-hover:text-[#183057] transition-colors uppercase">Fractional Leadership</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="fader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full"
                    >
                        <Chapter4BotFader />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
