'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
    FiActivity,
    FiAlertCircle,
    FiBarChart2,
    FiBriefcase,
    FiCalendar,
    FiCheckCircle,
    FiCompass,
    FiDollarSign,
    FiMap,
    FiTrendingUp,
    FiZap,
} from 'react-icons/fi';
import AnimatedCounter from './AnimatedCounter';

/* ──────────────────────────────────────── Types */

type ProposalViewModel = {
    id: string;
    clientName: string;
    clientCompany: string;
    clientRole?: string | null;
    clientEmail?: string | null;
    projectName: string;
    projectObjective: string;
    currentSituation: string;
    mainChallenges: string[];
    proposedSolution: string;
    expectedOutcomes: string[];
    timelineMonths: number;
    phases: { title: string; description: string; duration: string }[];
    totalInvestment: number;
    roiPercentage: number;
    costOfInaction: number;
    deliverables?: string[] | null;
    createdAt?: string | Date;
    expiresAt?: string | Date;
};

type SectionDef = { id: string; title: string; icon: IconType };

/* ──────────────────────────────────────── Constants */

const SECTIONS: SectionDef[] = [
    { id: 'hero', title: 'Resumen', icon: FiActivity },
    { id: 'diagnosis', title: 'Diagnóstico', icon: FiAlertCircle },
    { id: 'vision', title: 'Visión', icon: FiCompass },
    { id: 'roadmap', title: 'Roadmap', icon: FiMap },
    { id: 'investment', title: 'Inversión', icon: FiBarChart2 },
];

/* ──────────────────────────────────────── Helpers */

function normalize(arr: string[] | null | undefined) {
    return (arr ?? []).map((s) => s.trim()).filter(Boolean);
}

function money(v: number) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
        Number.isFinite(v) ? v : 0
    );
}

function fmtDate(v?: string | Date) {
    if (!v) return '—';
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? '—' : new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

/* ──────────────────────────────────────── Hooks */

function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        const obs = new IntersectionObserver(
            (entries) => {
                const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (hit?.target?.id) setActive(hit.target.id);
            },
            { rootMargin: '-15% 0px -65% 0px', threshold: [0.15, 0.4] }
        );
        nodes.forEach((n) => obs.observe(n));
        return () => obs.disconnect();
    }, [ids]);
    return active;
}

/* ──────────────────────────────────────── Stat Card */

function StatCard({
    icon: Icon,
    label,
    children,
    accent = 'cyan',
}: {
    icon: IconType;
    label: string;
    children: React.ReactNode;
    accent?: 'cyan' | 'emerald' | 'amber' | 'violet';
}) {
    const colorMap = {
        cyan: { bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.22)', iconBg: 'rgba(34,211,238,0.15)', icon: '#67e8f9', text: '#cffafe' },
        emerald: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.22)', iconBg: 'rgba(16,185,129,0.15)', icon: '#6ee7b7', text: '#d1fae5' },
        amber: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.22)', iconBg: 'rgba(245,158,11,0.15)', icon: '#fcd34d', text: '#fef3c7' },
        violet: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.22)', iconBg: 'rgba(139,92,246,0.15)', icon: '#c4b5fd', text: '#ede9fe' },
    };
    const c = colorMap[accent];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            style={{
                borderRadius: 16,
                border: `1px solid ${c.border}`,
                background: c.bg,
                padding: '18px 20px',
                display: 'grid',
                gap: 10,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', background: c.iconBg }}>
                    <Icon size={16} color={c.icon} />
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.icon }}>{label}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: c.text, lineHeight: 1.1 }}>{children}</div>
        </motion.div>
    );
}

/* ──────────────────────────────────────── Main Component */

export default function ProposalView({ proposal }: { proposal: ProposalViewModel }) {
    const { scrollYProgress } = useScroll();
    const activeSection = useActiveSection(SECTIONS.map((s) => s.id));

    const challenges = normalize(proposal.mainChallenges);
    const outcomes = normalize(proposal.expectedOutcomes);
    const deliverables = normalize(proposal.deliverables);
    const phases = proposal.phases ?? [];
    const timeLabel = `${proposal.timelineMonths} ${proposal.timelineMonths === 1 ? 'mes' : 'meses'}`;

    const costRatio = proposal.totalInvestment > 0 && proposal.costOfInaction > 0
        ? Math.min((proposal.costOfInaction * 12) / proposal.totalInvestment, 5)
        : 0;

    return (
        <div
            style={{
                minHeight: '100vh',
                background:
                    'radial-gradient(1200px 500px at 10% -10%, rgba(56,189,248,0.12), transparent 65%), radial-gradient(900px 500px at 90% 10%, rgba(59,130,246,0.13), transparent 65%), linear-gradient(160deg,#030711 0%, #071327 45%, #030915 100%)',
                color: '#e2e8f0',
                fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
        >
            {/* Progress bar */}
            <motion.div
                style={{
                    position: 'fixed', top: 0, left: 0, height: 3, width: '100%',
                    transformOrigin: '0%', scaleX: scrollYProgress,
                    background: 'linear-gradient(90deg, #22d3ee, #60a5fa)',
                    zIndex: 120,
                }}
            />

            {/* Header */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 100,
                borderBottom: '1px solid rgba(148,163,184,0.15)',
                background: 'rgba(2, 8, 23, 0.82)',
                backdropFilter: 'blur(12px)',
            }}>
                <div style={{
                    maxWidth: 1280, margin: '0 auto', padding: '10px 20px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap',
                }}>
                    <div>
                        <p style={{ margin: 0, color: '#67e8f9', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                            Propuesta Asygnuz
                        </p>
                        <h1 style={{ margin: '1px 0 0', fontSize: 18, color: '#f8fafc', fontWeight: 800 }}>
                            {proposal.projectName || proposal.clientCompany}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                            padding: '5px 10px', borderRadius: 999, fontSize: 11,
                            border: '1px solid rgba(103,232,249,0.3)', background: 'rgba(34,211,238,0.1)',
                            color: '#67e8f9', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5,
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                            Activa
                        </span>
                        <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.9)' }}>Vence: {fmtDate(proposal.expiresAt)}</span>
                    </div>
                </div>
            </header>

            {/* Layout */}
            <div style={{
                maxWidth: 1280, margin: '0 auto', padding: '24px 20px 60px',
                display: 'grid', gridTemplateColumns: '200px minmax(0, 1fr)', gap: 20,
            }}>
                {/* Sidebar Nav */}
                <aside style={{
                    position: 'sticky', top: 72, alignSelf: 'start',
                    borderRadius: 14, border: '1px solid rgba(148,163,184,0.12)',
                    background: 'rgba(10,18,35,0.7)', backdropFilter: 'blur(8px)', padding: 10,
                }}>
                    <div style={{ display: 'grid', gap: 4 }}>
                        {SECTIONS.map((sec) => {
                            const isActive = activeSection === sec.id;
                            const Icon = sec.icon;
                            return (
                                <button
                                    key={sec.id}
                                    type="button"
                                    onClick={() => document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left',
                                        padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
                                        border: isActive ? '1px solid rgba(103,232,249,0.4)' : '1px solid transparent',
                                        background: isActive ? 'rgba(34,211,238,0.12)' : 'transparent',
                                        color: isActive ? '#cffafe' : '#94a3b8',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <Icon size={14} />
                                    <span style={{ fontSize: 12, fontWeight: 700 }}>{sec.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Main Content */}
                <main style={{ display: 'grid', gap: 20 }}>

                    {/* ── HERO SECTION ── */}
                    <section id="hero" style={{ scrollMarginTop: 80, display: 'grid', gap: 16 }}>
                        {/* Client info + Objective */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                borderRadius: 20, padding: '28px 28px 24px',
                                border: '1px solid rgba(148,163,184,0.15)',
                                background: 'linear-gradient(165deg, rgba(15,23,42,0.9) 0%, rgba(10,18,35,0.85) 100%)',
                                position: 'relative', overflow: 'hidden',
                            }}
                        >
                            {/* Decorative glow */}
                            <div style={{
                                position: 'absolute', top: -60, right: -60, width: 200, height: 200,
                                borderRadius: '50%', background: 'rgba(34,211,238,0.06)', filter: 'blur(60px)', pointerEvents: 'none',
                            }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
                                    <div>
                                        <p style={{ margin: 0, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#67e8f9', fontWeight: 700 }}>
                                            Preparado para
                                        </p>
                                        <h2 style={{ margin: '4px 0 2px', fontSize: 30, fontWeight: 800, color: '#f8fafc' }}>
                                            {proposal.clientName}
                                        </h2>
                                        <p style={{ margin: 0, fontSize: 15, color: '#94a3b8' }}>
                                            {proposal.clientCompany}{proposal.clientRole ? ` · ${proposal.clientRole}` : ''}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        <span style={{
                                            padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                                            border: '1px solid rgba(148,163,184,0.2)', background: 'rgba(255,255,255,0.03)',
                                            color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 5,
                                        }}>
                                            <FiCalendar size={12} /> {fmtDate(proposal.createdAt)}
                                        </span>
                                        <span style={{
                                            padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                                            border: '1px solid rgba(148,163,184,0.2)', background: 'rgba(255,255,255,0.03)',
                                            color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 5,
                                        }}>
                                            <FiMap size={12} /> {timeLabel}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ borderRadius: 14, border: '1px solid rgba(148,163,184,0.12)', background: 'rgba(255,255,255,0.02)', padding: '16px 18px' }}>
                                    <p style={{ margin: 0, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7dd3fc', fontWeight: 700, marginBottom: 6 }}>Objetivo</p>
                                    <p style={{ margin: 0, color: '#e2e8f0', fontSize: 15, lineHeight: 1.65 }}>{proposal.projectObjective}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* KPI Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                            <StatCard icon={FiDollarSign} label="Inversión" accent="cyan">
                                <AnimatedCounter value={proposal.totalInvestment} prefix="$" />
                            </StatCard>
                            <StatCard icon={FiTrendingUp} label="ROI Estimado" accent="emerald">
                                <AnimatedCounter value={proposal.roiPercentage} suffix="%" />
                            </StatCard>
                            <StatCard icon={FiZap} label="Costo Inacción / Mes" accent="amber">
                                <AnimatedCounter value={proposal.costOfInaction} prefix="$" />
                            </StatCard>
                            <StatCard icon={FiBriefcase} label="Timeline" accent="violet">
                                {timeLabel}
                            </StatCard>
                        </div>
                    </section>

                    {/* ── DIAGNOSIS ── */}
                    <section id="diagnosis" style={{ scrollMarginTop: 80 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.35 }}
                            style={{
                                borderRadius: 18, border: '1px solid rgba(148,163,184,0.15)',
                                background: 'linear-gradient(165deg, rgba(15,23,42,0.88) 0%, rgba(10,18,35,0.82) 100%)',
                                padding: 24, display: 'grid', gap: 16,
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
                                    <FiAlertCircle size={17} color="#fca5a5" />
                                </span>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: 20, color: '#f8fafc', fontWeight: 800 }}>Diagnóstico Actual</h2>
                                    <p style={{ margin: '1px 0 0', color: 'rgba(191,219,254,0.8)', fontSize: 12 }}>Puntos de fricción identificados</p>
                                </div>
                            </div>

                            <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.65, fontSize: 14 }}>{proposal.currentSituation}</p>

                            <div style={{ display: 'grid', gap: 8 }}>
                                {challenges.map((item, i) => (
                                    <motion.div
                                        key={`c-${i}`}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        style={{
                                            display: 'flex', alignItems: 'flex-start', gap: 10,
                                            padding: '12px 14px', borderRadius: 12,
                                            border: '1px solid rgba(239,68,68,0.18)', background: 'rgba(239,68,68,0.06)',
                                        }}
                                    >
                                        <span style={{
                                            width: 22, height: 22, borderRadius: 6, display: 'grid', placeItems: 'center',
                                            background: 'rgba(239,68,68,0.15)', flexShrink: 0, marginTop: 1,
                                        }}>
                                            <FiAlertCircle size={12} color="#fca5a5" />
                                        </span>
                                        <span style={{ color: '#fecdd3', fontSize: 14 }}>{item}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Cost gauge */}
                            {costRatio > 0 && (
                                <div style={{ borderRadius: 12, border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.06)', padding: '14px 16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                        <span style={{ fontSize: 12, color: '#fcd34d', fontWeight: 700 }}>Costo anual de inacción vs inversión</span>
                                        <span style={{ fontSize: 13, color: '#fef3c7', fontWeight: 800 }}>
                                            {money(proposal.costOfInaction * 12)} / año
                                        </span>
                                    </div>
                                    <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${Math.min(costRatio / 5 * 100, 100)}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }}
                                        />
                                    </div>
                                    <p style={{ margin: '6px 0 0', fontSize: 11, color: '#fcd34d' }}>
                                        {costRatio.toFixed(1)}x más costoso que la inversión propuesta
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </section>

                    {/* ── VISION ── */}
                    <section id="vision" style={{ scrollMarginTop: 80 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.35 }}
                            style={{
                                borderRadius: 18, border: '1px solid rgba(148,163,184,0.15)',
                                background: 'linear-gradient(165deg, rgba(15,23,42,0.88) 0%, rgba(10,18,35,0.82) 100%)',
                                padding: 24, display: 'grid', gap: 16,
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}>
                                    <FiCompass size={17} color="#6ee7b7" />
                                </span>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: 20, color: '#f8fafc', fontWeight: 800 }}>Visión Objetivo</h2>
                                    <p style={{ margin: '1px 0 0', color: 'rgba(191,219,254,0.8)', fontSize: 12 }}>Escenario deseado tras implementación</p>
                                </div>
                            </div>

                            <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.65, fontSize: 14 }}>{proposal.proposedSolution}</p>

                            <div style={{ display: 'grid', gap: 8 }}>
                                {outcomes.map((item, i) => (
                                    <motion.div
                                        key={`o-${i}`}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        style={{
                                            display: 'flex', alignItems: 'flex-start', gap: 10,
                                            padding: '12px 14px', borderRadius: 12,
                                            border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.06)',
                                        }}
                                    >
                                        <span style={{
                                            width: 22, height: 22, borderRadius: 6, display: 'grid', placeItems: 'center',
                                            background: 'rgba(16,185,129,0.15)', flexShrink: 0, marginTop: 1,
                                        }}>
                                            <FiCheckCircle size={12} color="#6ee7b7" />
                                        </span>
                                        <span style={{ color: '#dcfce7', fontSize: 14 }}>{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>

                    {/* ── ROADMAP ── */}
                    <section id="roadmap" style={{ scrollMarginTop: 80 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.35 }}
                            style={{
                                borderRadius: 18, border: '1px solid rgba(148,163,184,0.15)',
                                background: 'linear-gradient(165deg, rgba(15,23,42,0.88) 0%, rgba(10,18,35,0.82) 100%)',
                                padding: 24, display: 'grid', gap: 20,
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)' }}>
                                    <FiMap size={17} color="#a5b4fc" />
                                </span>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: 20, color: '#f8fafc', fontWeight: 800 }}>Roadmap de Ejecución</h2>
                                    <p style={{ margin: '1px 0 0', color: 'rgba(191,219,254,0.8)', fontSize: 12 }}>Plan por fases con entregables claros</p>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div style={{ position: 'relative', paddingLeft: 28 }}>
                                {/* Vertical line */}
                                <div style={{
                                    position: 'absolute', left: 8, top: 4, bottom: 4, width: 2,
                                    background: 'linear-gradient(180deg, rgba(99,102,241,0.4), rgba(34,211,238,0.2))',
                                    borderRadius: 2,
                                }} />

                                <div style={{ display: 'grid', gap: 16 }}>
                                    {phases.map((phase, i) => (
                                        <motion.div
                                            key={`p-${i}`}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08 }}
                                            style={{ position: 'relative' }}
                                        >
                                            {/* Dot */}
                                            <div style={{
                                                position: 'absolute', left: -24, top: 14, width: 12, height: 12,
                                                borderRadius: '50%', background: '#6366f1', border: '2px solid #0f172a',
                                                boxShadow: '0 0 8px rgba(99,102,241,0.4)',
                                            }} />

                                            <div style={{
                                                borderRadius: 14, padding: '16px 18px',
                                                border: '1px solid rgba(99,102,241,0.18)', background: 'rgba(99,102,241,0.06)',
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                                                    <h3 style={{ margin: 0, fontSize: 15, color: '#f8fafc', fontWeight: 700 }}>
                                                        <span style={{ color: '#a5b4fc', fontSize: 12, fontWeight: 800, marginRight: 6 }}>Fase {i + 1}</span>
                                                        {phase.title}
                                                    </h3>
                                                    <span style={{ fontSize: 11, color: '#a5b4fc', fontWeight: 700, padding: '3px 8px', borderRadius: 999, border: '1px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.1)' }}>
                                                        {phase.duration}
                                                    </span>
                                                </div>
                                                <p style={{ margin: 0, fontSize: 13, color: '#cbd5e1', lineHeight: 1.55 }}>{phase.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Deliverables */}
                            {deliverables.length > 0 && (
                                <div>
                                    <p style={{ margin: '0 0 8px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7dd3fc', fontWeight: 700 }}>Entregables clave</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {deliverables.map((item, i) => (
                                            <span key={`d-${i}`} style={{
                                                borderRadius: 999, padding: '5px 10px', fontSize: 12, fontWeight: 600,
                                                border: '1px solid rgba(125,211,252,0.25)', background: 'rgba(34,211,238,0.06)', color: '#cffafe',
                                            }}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </section>

                    {/* ── INVESTMENT ── */}
                    <section id="investment" style={{ scrollMarginTop: 80 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.35 }}
                            style={{
                                borderRadius: 18, border: '1px solid rgba(148,163,184,0.15)',
                                background: 'linear-gradient(165deg, rgba(15,23,42,0.88) 0%, rgba(10,18,35,0.82) 100%)',
                                padding: 24, display: 'grid', gap: 20,
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.3)' }}>
                                    <FiTrendingUp size={17} color="#67e8f9" />
                                </span>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: 20, color: '#f8fafc', fontWeight: 800 }}>Inversión y Caso de Negocio</h2>
                                    <p style={{ margin: '1px 0 0', color: 'rgba(191,219,254,0.8)', fontSize: 12 }}>Métricas para toma de decisión ejecutiva</p>
                                </div>
                            </div>

                            {/* Main investment cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                                <div style={{ borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(34,211,238,0.2)', background: 'rgba(34,211,238,0.06)' }}>
                                    <p style={{ margin: 0, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#67e8f9', fontWeight: 700 }}>Inversión Total</p>
                                    <p style={{ margin: '8px 0 0', fontSize: 32, color: '#cffafe', fontWeight: 800, lineHeight: 1 }}>
                                        <AnimatedCounter value={proposal.totalInvestment} prefix="$" />
                                    </p>
                                    <p style={{ margin: '6px 0 0', fontSize: 12, color: '#94a3b8' }}>Pago único</p>
                                </div>
                                <div style={{ borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.06)' }}>
                                    <p style={{ margin: 0, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6ee7b7', fontWeight: 700 }}>Retorno de Inversión</p>
                                    <p style={{ margin: '8px 0 0', fontSize: 32, color: '#d1fae5', fontWeight: 800, lineHeight: 1 }}>
                                        <AnimatedCounter value={proposal.roiPercentage} suffix="%" />
                                    </p>
                                    <p style={{ margin: '6px 0 0', fontSize: 12, color: '#94a3b8' }}>ROI estimado</p>
                                </div>
                                <div style={{ borderRadius: 14, padding: '18px 20px', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.06)' }}>
                                    <p style={{ margin: 0, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fcd34d', fontWeight: 700 }}>Costo de No Actuar</p>
                                    <p style={{ margin: '8px 0 0', fontSize: 32, color: '#fef3c7', fontWeight: 800, lineHeight: 1 }}>
                                        <AnimatedCounter value={proposal.costOfInaction} prefix="$" />
                                    </p>
                                    <p style={{ margin: '6px 0 0', fontSize: 12, color: '#94a3b8' }}>Pérdida mensual estimada</p>
                                </div>
                            </div>

                            {/* ROI visual gauge */}
                            {proposal.roiPercentage > 0 && (
                                <div style={{ borderRadius: 14, border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(16,185,129,0.04)', padding: '16px 18px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                        <span style={{ fontSize: 12, color: '#6ee7b7', fontWeight: 700 }}>Gauge de ROI</span>
                                        <span style={{ fontSize: 14, color: '#d1fae5', fontWeight: 800 }}>{proposal.roiPercentage}%</span>
                                    </div>
                                    <div style={{ height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${Math.min(proposal.roiPercentage, 500) / 5}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.2, ease: 'easeOut' }}
                                            style={{
                                                height: '100%', borderRadius: 999,
                                                background: 'linear-gradient(90deg, #10b981, #22d3ee, #60a5fa)',
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </section>

                </main>
            </div>
        </div>
    );
}
