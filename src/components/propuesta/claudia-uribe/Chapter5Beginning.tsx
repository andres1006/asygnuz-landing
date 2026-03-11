"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { audioManager } from '@/lib/propuesta/audio-manager';

export default function Chapter5Beginning() {
    const handleActivate = () => {
        audioManager.playResolution();
        // Here we could trigger a contact form or a success message
        alert("¡Programa activado! Asygnuz se pondrá en contacto contigo en breve.");
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#0A0E17] px-8 text-center space-y-12 relative overflow-hidden">
            <div className="space-y-6 max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-7xl font-serif text-white leading-tight"
                >
                    No venimos a ser tu agencia.<br />
                    <span className="text-[#C9A84C]">Venimos a construir la tuya.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-white/40 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase"
                >
                    Juan Pablo Ríos · Andrés Agudelo · Asygnuz S.A.S. · 2026
                </motion.p>
            </div>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                onClick={handleActivate}
                className="group relative px-12 py-5 bg-[#C9A84C] text-[#0A0E17] font-mono font-bold tracking-[0.2em] overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                ACTIVAR EL PROGRAMA
            </motion.button>

            <div className="absolute inset-x-0 bottom-12 flex justify-center">
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent"
                />
            </div>
        </div>
    );
}
