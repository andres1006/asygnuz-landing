"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from '@/components/propuesta/claudia-uribe/SmoothScroll';

import ServicesHero from '@/components/propuesta/servicios/ServicesHero';
import ModelsOverview from '@/components/propuesta/servicios/ModelsOverview';
import ProofSection from '@/components/propuesta/servicios/ProofSection';
import ConsultoriaSection from '@/components/propuesta/servicios/ConsultoriaSection';
import FullManagementSection from '@/components/propuesta/servicios/FullManagementSection';
import AscendMethod from '@/components/propuesta/servicios/AscendMethod';
import ServicesTeam from '@/components/propuesta/servicios/ServicesTeam';
import ComparativoSection from '@/components/propuesta/servicios/ComparativoSection';
import ServicesCTA from '@/components/propuesta/servicios/ServicesCTA';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    { id: 'hero', label: 'INICIO' },
    { id: 'overview', label: 'MODELOS' },
    { id: 'proof', label: 'RESULTADOS' },
    { id: 'consultoria', label: 'CONSULTORÍA' },
    { id: 'full', label: 'FULL MANAGEMENT' },
    { id: 'ascend', label: 'A.S.C.E.N.D.' },
    { id: 'team', label: 'EQUIPO' },
    { id: 'comparativo', label: 'COMPARATIVO' },
    { id: 'cta', label: 'ARRANCAR' },
];

export default function ServiciosPropuesta() {
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

    // Entrance reveal animations
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
                                start: "top 85%",
                                toggleActions: "play none none reverse",
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
                <section id="hero" className="relative z-10 bg-[#F8FAFC]">
                    <ServicesHero isStarted={isStarted} onStart={handleStart} />
                </section>

                {isStarted && (
                    <div className="relative w-full z-20">
                        <div className="w-full bg-white">
                            <section id="overview" className="w-full min-h-screen py-20 section-reveal">
                                <ModelsOverview />
                            </section>
                        </div>

                        <div className="w-full bg-[#F8FAFC]">
                            <section id="proof" className="w-full min-h-screen py-20 section-reveal">
                                <ProofSection />
                            </section>
                        </div>

                        <div className="w-full bg-white">
                            <section id="consultoria" className="w-full min-h-screen py-20 section-reveal">
                                <ConsultoriaSection />
                            </section>
                        </div>

                        <div className="w-full bg-[#183057]">
                            <section id="full" className="w-full min-h-screen section-reveal">
                                <FullManagementSection />
                            </section>
                        </div>

                        <div className="w-full bg-[#F8FAFC]">
                            <section id="ascend" className="w-full min-h-screen py-20 section-reveal">
                                <AscendMethod />
                            </section>
                        </div>

                        <div className="w-full bg-white">
                            <section id="team" className="w-full min-h-screen py-20 section-reveal">
                                <ServicesTeam />
                            </section>
                        </div>

                        <div className="w-full bg-[#F8FAFC]">
                            <section id="comparativo" className="w-full min-h-screen py-20 section-reveal">
                                <ComparativoSection />
                            </section>
                        </div>

                        <div className="w-full bg-white">
                            <section id="cta" className="w-full min-h-screen section-reveal">
                                <ServicesCTA />
                            </section>
                        </div>
                    </div>
                )}

                {/* HUD Navigation */}
                {isStarted && (
                    <>
                        <div className="fixed left-8 top-8 z-50">
                            <img src="/logos/AsygnuzLogo1-010.png" alt="Asygnuz" className="h-8 md:h-10 object-contain" />
                        </div>
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
                    </>
                )}
            </main>
        </SmoothScroll>
    );
}
