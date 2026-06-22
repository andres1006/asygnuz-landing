"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface InlineCTAProps {
    text: string;
    buttonLabel: string;
    /** "light" for use on dark backgrounds, "dark" for light backgrounds */
    variant?: 'light' | 'dark';
}

/**
 * Reusable mid-funnel CTA. Smoothly scrolls to the final "cta" section so the
 * client can act the moment they feel convinced — no need to reach the bottom.
 */
export default function InlineCTA({ text, buttonLabel, variant = 'dark' }: InlineCTAProps) {
    const goToContact = () => {
        document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
    };

    const isLight = variant === 'light';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col sm:flex-row items-center justify-between gap-5 rounded-[2rem] px-7 py-6 ${
                isLight
                    ? 'bg-white/[0.06] border border-white/15'
                    : 'bg-[#183057]/[0.04] border border-[#183057]/10'
            }`}
        >
            <p
                className={`text-sm md:text-base font-semibold text-center sm:text-left text-pretty ${
                    isLight ? 'text-white/80' : 'text-[#183057]/70'
                }`}
            >
                {text}
            </p>
            <button
                onClick={goToContact}
                className={`group shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono font-bold text-xs tracking-[0.15em] uppercase transition-all duration-500 min-h-[44px] ${
                    isLight
                        ? 'bg-white text-[#183057] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]'
                        : 'bg-[#183057] text-white hover:shadow-[0_0_30px_rgba(24,48,87,0.3)]'
                }`}
            >
                {buttonLabel}
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
        </motion.div>
    );
}
