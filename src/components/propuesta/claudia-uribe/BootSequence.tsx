"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '@/lib/propuesta/audio-manager';

const BOOT_LINES = [
    "Authenticating C. Uribe...",
    "Bypassing fragile architecture...",
    "Scanning: 450,000 voice-of-movement nodes...",
    "Initializing Vórtex Digital Infrastructure...",
    "Access Granted. Welcome, Claudia."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (visibleLines < BOOT_LINES.length) {
            const timer = setTimeout(() => {
                setVisibleLines(prev => prev + 1);
                if (visibleLines === 0) audioManager.playBootBeeps();
                if (visibleLines === BOOT_LINES.length - 1) audioManager.playPing();
            }, 600);
            return () => clearTimeout(timer);
        } else {
            setTimeout(() => setShowPassword(true), 1000);
        }
    }, [visibleLines]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app we'd use an env var, here we use a placeholder or the one from spec
        if (password.toLowerCase() === "vortex" || password.toLowerCase() === "claudia") {
            audioManager.playDrone();
            onComplete();
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#FFFFFF] z-50 relative px-4">
            <div className="w-full max-w-md space-y-4 font-mono">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-sm ${i === BOOT_LINES.length - 1 ? 'text-[#183057] text-lg font-black mt-4' : 'text-[#183057]/40 font-bold'}`}
                    >
                        {">"} {line}
                    </motion.div>
                ))}

                <AnimatePresence>
                    {showPassword && (
                        <motion.form
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleSubmit}
                            className="mt-8 flex flex-col items-center space-y-4"
                        >
                            <input
                                autoFocus
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="PASSWORD"
                                className={`bg-transparent border-b-2 outline-none py-2 text-center text-[#183057] tracking-[0.5em] transition-colors font-black ${error ? 'border-red-500' : 'border-[#183057]/10 focus:border-[#183057]'
                                    }`}
                            />
                            <p className="text-[10px] text-[#183057]/30 font-bold">ACCESO RESTRINGIDO — PERSONALIZADO PARA CLAUDIA URIBE</p>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
