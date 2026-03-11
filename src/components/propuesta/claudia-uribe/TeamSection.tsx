"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
    {
        initials: "JP",
        image: "/Pablo.jpeg",
        name: "Juan Pablo Ríos Carmona",
        role: "Enterprise Architecture & Governance Lead",
        description: "Gerente de Proyectos de Ingeniería y Tecnología con más de 5 años de experiencia en gobernanza End-to-End de proyectos complejos y transformación digital.",
        highlights: [
            "Director TIC (CTO) de Café Quindío",
            "Certificado PMI/PMBOK",
            "Experto en Gobernanza Digital",
        ],
        skills: ["TOGAF", "AWS", "Python", "TypeScript", "LangChain"],
    },
    {
        initials: "AA",
        image: "/Andres.jpeg",
        name: "Andrés Agudelo",
        role: "Digital Growth & UI/UX Lead",
        description: "Ingeniero de Sistemas y Diseñador Gráfico con más de 6 años de experiencia en desarrollo Full Stack y arquitectura de interfaces.",
        highlights: [
            "Frontend Developer Senior Arukay",
            "Frontend en Infosel (México)",
            "Arquitecto de Experiencias Digitales",
        ],
        skills: ["Next.js", "TypeScript", "UI/UX", "PostgreSQL", "React Native"],
    },
    {
        initials: "MM",
        image: "/Manuel-Marin.jpeg",
        name: "Manuel Marin",
        role: "Trafiquer / Copywriter",
        description: "Estratega en adquisición de tráfico pago y redacción persuasiva. Experto en optimizar presupuestos y convertir leads en clientes mediante contenido estratégico.",
        highlights: [
            "Estratega de Tráfico Pago",
            "Copywriting Persuasivo",
            "Optimización de Conversión",
        ],
        skills: ["Facebook Ads", "Google Ads", "Copywriting", "Sales Funnels", "Data Analysis"],
    },
    {
        initials: "SG",
        image: "/Santiago-Gallo.jpeg",
        name: "Santiago Gallo",
        role: "Videomaker & Content Specialist",
        description: "Especialista en narrativa visual y creación de contenido de alto impacto para marcas personales y corporativas. Experto en capturar la esencia del movimiento.",
        highlights: [
            "Director Audiovisual",
            "Edición de alto impacto",
            "Storytelling Visual",
        ],
        skills: ["Premiere", "After Effects", "Color Grading", "Cámara", "Dron"],
    },
    {
        initials: "DP",
        image: "/Dariana-Pineda.jpeg",
        name: "Dariana Pineda",
        role: "Community Manager & Designer",
        description: "Diseñadora Gráfica y estratega de contenido enfocada en la estética visual y la coherencia de marca. Experta en gestión de comunidades digitales y diseño de piezas de impacto.",
        highlights: [
            "Diseño de Marca",
            "Gestión de Comunidades",
            "Estrategia de Contenido",
        ],
        skills: ["Illustrator", "Photoshop", "Content Strategy", "Social Media", "Figma"],
    },
];

export default function TeamSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            // Animación para el encabezado y el ancla de precio
            gsap.fromTo(".team-title",
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out"
                }
            );

            // Animación para las tarjetas de equipo - Aseguramos visibilidad final
            gsap.fromTo(".team-card",
                { opacity: 0, y: 40 },
                {
                    scrollTrigger: {
                        trigger: ".team-grid",
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "expo.out",
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="px-6 md:px-12 py-24 w-full max-w-7xl mx-auto">

            {/* Value Proposition Header */}
            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-end justify-between mb-20">
                <div className="space-y-4 max-w-2xl text-center lg:text-left">
                    <p className="team-title text-[10px] font-mono tracking-[0.5em] text-[#183057]/60 uppercase font-bold">
                        Parte VI — El Equipo Escolta
                    </p>
                    <h2 className="team-title text-3xl md:text-5xl lg:text-6xl font-black text-[#183057] leading-tight tracking-tight">
                        Los <span className="text-[#183057] opacity-60">arquitectos</span> <br className="hidden md:block" />del movimiento.
                    </h2>
                </div>

                {/* Powerful Cost Anchor - Lighter but vibrant blue */}
                <div className="team-title bg-[#F8FAFC] p-6 md:p-8 rounded-3xl shadow-lg border border-[#183057]/10 max-w-md relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#183057] blur-[60px] opacity-[0.05] rounded-full" />
                    <svg className="w-8 h-8 text-[#183057] mb-4 opacity-40" fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>
                    <p className="text-[#183057]/60 text-sm md:text-base font-medium leading-relaxed">
                        <span className="text-[#183057] font-bold">Por un costo mensual inferior</span> al de un ingeniero senior con prestaciones, Claudia integra una <strong className="text-[#183057]">célula directiva completa</strong>.
                    </p>
                </div>
            </div>

            {/* Profiles Grid */}
            <div className="team-grid grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-16">

                {TEAM.map((member, i) => (
                    <div
                        key={i}
                        className="team-card bg-white p-8 md:p-10 rounded-[2rem] border border-[#183057]/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(24,48,87,0.08)] hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group"
                    >
                        {/* Highlight Blob */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#183057]/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex flex-col md:flex-row gap-6 items-start mb-8 relative z-10">
                            {/* Avatar with Image or Initials */}
                            <div className="w-20 h-20 rounded-3xl bg-[#183057]/5 flex items-center justify-center shadow-lg border border-white flex-shrink-0 overflow-hidden relative">
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <span className="text-2xl font-black text-[#183057]">{member.initials}</span>
                                )}
                            </div>

                            <div>
                                <h3 className="text-2xl md:text-3xl font-black text-[#183057] mb-2">{member.name}</h3>
                                <p className="text-[11px] font-mono tracking-widest text-[#183057]/60 uppercase font-bold">{member.role}</p>
                            </div>
                        </div>

                        <p className="text-base text-[#1a1a2e]/70 leading-relaxed mb-8 relative z-10">
                            {member.description}
                        </p>

                        <div className="bg-[#183057]/[0.02] rounded-2xl p-6 border border-[#183057]/[0.03] space-y-3 mb-8 relative z-10">
                            {member.highlights.map((h, j) => (
                                <div key={j} className="flex items-start gap-3 text-sm text-[#183057]/60 font-medium">
                                    <span className="text-[#183057]/40 mt-0.5 opacity-80">✦</span>
                                    <span>{h}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2 relative z-10">
                            {member.skills.map((skill, j) => (
                                <span
                                    key={j}
                                    className="px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase rounded-full border border-[#183057]/10 text-[#183057]/40 bg-white shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Network Footer */}
            <div className="text-center w-full max-w-3xl mx-auto pt-8 border-t border-[#183057]/5">
                <p className="text-xs md:text-sm text-[#183057]/40 font-mono tracking-[0.1em] leading-relaxed uppercase">
                    + Red de aliados: Trafikkers (Ads), Community Managers, Expertos WhatsApp, Diseño UI/UX <br className="hidden md:block" />
                    <span className="text-[#183057]/60 font-bold">— Todos bajo arquitectura, metodología y gobierno de Asygnuz.</span>
                </p>
            </div>
        </div>
    );
}
