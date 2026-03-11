"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from '@/components/propuesta/claudia-uribe/SmoothScroll';


import HeroSection from '@/components/propuesta/claudia-uribe/HeroSection';
import BentoProof from '@/components/propuesta/claudia-uribe/BentoProof';
import CrackDiagnosis from '@/components/propuesta/claudia-uribe/CrackDiagnosis';
import VisionTransform from '@/components/propuesta/claudia-uribe/VisionTransform';
import AscendTimeline from '@/components/propuesta/claudia-uribe/AscendTimeline';
import ThreeDoors from '@/components/propuesta/claudia-uribe/ThreeDoors';
import TeamSection from '@/components/propuesta/claudia-uribe/TeamSection';
import FinalCTA from '@/components/propuesta/claudia-uribe/FinalCTA';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    { id: 'hero', label: 'INICIO' },
    { id: 'proof', label: 'RESULTADOS' },
    { id: 'diagnosis', label: 'DIAGNÓSTICO' },
    { id: 'vision', label: 'VISIÓN' },
    { id: 'ascend', label: 'A.S.C.E.N.D.' },
    { id: 'doors', label: 'ESCENARIOS' },
    { id: 'team', label: 'EQUIPO' },
    { id: 'cta', label: 'ACTIVAR' },
];

export default function ClaudiaUribePropuesta() {
    const [isStarted, setIsStarted] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const mainRef = useRef<HTMLDivElement>(null);

    // Track active section
    useEffect(() => {
        if (!mainRef.current) return;
        const sections = SECTIONS.map(s => document.getElementById(s.id));
        const observers = sections.map((section, i) => {
            if (!section) return null;
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(SECTIONS[i].id); },
                { threshold: 0.3 }
            );
            observer.observe(section);
            return observer;
        });
        return () => {
            observers.forEach((obs, i) => { if (obs && sections[i]) obs.unobserve(sections[i]!); });
        };
    }, [isStarted]);

    // Tetris Dashboard with pinned sections to prevent overlap
    useEffect(() => {
        if (!isStarted) return;
        const raf = requestAnimationFrame(() => {
            gsap.context(() => {
                const sections = gsap.utils.toArray('.section-reveal') as HTMLElement[];

                sections.forEach((section) => {
                    gsap.fromTo(section,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 85%", // Triggers animation when section enters bottom 15% of screen
                                toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
                            }
                        }
                    );
                });
            });
        });
        return () => cancelAnimationFrame(raf);
    }, [isStarted]);

    const handleStart = () => setIsStarted(true);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <SmoothScroll>
            <main
                ref={mainRef}
                className="relative text-[#183057] selection:bg-[#183057] selection:text-white"
                style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}
            >


                {/* HERO — fixed title with zoom-out */}
                <section id="hero" className="relative z-10 bg-[#183057]">
                    <HeroSection isAudioReady={isStarted} onInitAudio={handleStart} />
                </section>

                {isStarted && (
                    <div className="relative w-full z-20">
                        {/* 
                            Standard Document Flow
                            Sections appear naturally one after another with entrance animations.
                        */}
                        <div className="w-full bg-white">
                            <section id="proof" className="w-full min-h-screen py-20 section-reveal">
                                <BentoProof />
                            </section>
                        </div>

                        <div className="w-full bg-[#F8FAFC]">
                            <section id="diagnosis" className="w-full min-h-screen py-20 section-reveal">
                                <CrackDiagnosis />
                            </section>
                        </div>

                        <div className="w-full bg-[#183057]">
                            <section id="vision" className="w-full min-h-screen section-reveal">
                                <VisionTransform />
                            </section>
                        </div>

                        <div className="w-full bg-[#F8FAFC]">
                            <section id="ascend" className="w-full min-h-screen py-20 section-reveal">
                                <AscendTimeline />
                            </section>
                        </div>

                        <div className="w-full bg-white">
                            <section id="doors" className="w-full min-h-screen py-20 section-reveal">
                                <ThreeDoors />
                            </section>
                        </div>

                        <div className="w-full bg-[#F8FAFC]">
                            <section id="team" className="w-full min-h-screen py-20 section-reveal">
                                <TeamSection />
                            </section>
                        </div>

                        <div className="w-full bg-white">
                            <section id="cta" className="w-full min-h-screen section-reveal">
                                <FinalCTA />
                            </section>
                        </div>
                    </div>
                )}

                {/* HUD Navigation — always dark theme */}
                {isStarted && (
                    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-3">
                        {SECTIONS.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => scrollToSection(s.id)}
                                className="group flex items-center gap-3"
                            >
                                <span className={`text-[9px] font-mono tracking-[0.2em] transition-all duration-500 ${activeSection === s.id
                                    ? 'text-[#183057] opacity-100'
                                    : 'text-[#183057]/0 group-hover:text-[#183057]/40 opacity-0 group-hover:opacity-100'
                                    }`}>
                                    {s.label}
                                </span>
                                <span className={`block rounded-full transition-all duration-500 ${activeSection === s.id
                                    ? 'w-3 h-3 bg-[#183057] shadow-[0_0_12px_rgba(24,48,87,0.4)]'
                                    : 'w-1.5 h-1.5 bg-[#183057]/20 group-hover:bg-[#183057]/40'
                                    }`} />
                            </button>
                        ))}
                    </nav>
                )}
            </main>
        </SmoothScroll>
    );
}
