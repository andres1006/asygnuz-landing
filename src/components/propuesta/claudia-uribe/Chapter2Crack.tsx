"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '@/lib/propuesta/audio-manager';

const PARADOXES = [
    { teach: "Invertir sin estructura es improvisación.", live: "tu stack fue construido sin arquitectura de datos." },
    { teach: "La Reserva de Oxígeno protege ante imprevistos.", live: "no existe reserva de oxígeno digital." },
    { teach: "Tu método no puede depender de tu figura.", live: "si tu agencia se va, la operación colapsa." }
];

export default function Chapter2Crack() {
    const [index, setIndex] = useState(0);
    const [showCrack, setShowCrack] = useState(false);
    const [crackHealed, setCrackHealed] = useState(false);

    useEffect(() => {
        audioManager.playSubBass();

        const interval = setInterval(() => {
            setIndex(prev => {
                if (prev < PARADOXES.length - 1) return prev + 1;
                clearInterval(interval);
                setTimeout(() => setShowCrack(true), 2000);
                return prev;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (showCrack) {
            audioManager.playSubBass();
            setTimeout(() => {
                setCrackHealed(true);
                audioManager.playChime();
            }, 1000);
        }
    }, [showCrack]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#000000] relative overflow-hidden px-8">
            <AnimatePresence mode="wait">
                {!showCrack && (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center space-y-8 max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                            "{PARADOXES[index].teach}"
                        </h2>
                        <div className="text-[#C0392B] font-mono text-sm tracking-[0.2em] flex items-center justify-center gap-2">
                            <span className="text-xl">⚠</span> {PARADOXES[index].live.toUpperCase()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showCrack && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.path
                                d="M 50 0 L 52 20 L 48 40 L 55 60 L 45 80 L 50 100"
                                fill="none"
                                stroke={crackHealed ? "#C9A84C" : "#FFFFFF"}
                                strokeWidth="0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </svg>

                        {crackHealed && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute text-center px-4"
                            >
                                <h3 className="text-[#C9A84C] text-2xl md:text-4xl font-serif">
                                    Esto no es una crítica.<br />Es la oportunidad más poderosa de tu negocio.
                                </h3>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
