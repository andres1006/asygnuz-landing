'use client';

import { useEffect, useMemo, useState } from 'react';
import ProposalView from '@/components/proposal/ProposalView';
import type { CreateProposalDTO } from '@/types/proposal';
import { FiSliders, FiDollarSign, FiTrendingUp, FiZap, FiCalendar } from 'react-icons/fi';

const PREVIEW_EVENT_NAME = 'asygnuz-proposal-preview-update';

const BASE_DRAFT: CreateProposalDTO = {
    clientName: 'Cliente Demo',
    clientCompany: 'Empresa Demo',
    clientRole: 'CEO',
    clientEmail: '',
    projectName: 'Transformación Comercial 360',
    projectObjective: 'Acelerar la adquisición y mejorar la conversión del embudo comercial.',
    currentSituation: 'Actualmente el flujo comercial presenta fugas importantes en la etapa de calificación y seguimiento.',
    mainChallenges: ['Baja trazabilidad de leads', 'Follow-up manual', 'Conversión inconsistente'],
    proposedSolution: 'Implementar una arquitectura de captación y nurturing automatizada con foco en conversión.',
    expectedOutcomes: ['Incremento en tasa de cierre', 'Reducción del CAC', 'Mejor velocity comercial'],
    timelineMonths: 6,
    phases: [
        { title: 'Diagnóstico', description: 'Auditoría integral de embudo y data.', duration: 'Semanas 1-2' },
        { title: 'Implementación', description: 'Optimización de activos y automatizaciones.', duration: 'Semanas 3-8' },
    ],
    totalInvestment: 12000,
    roiPercentage: 240,
    costOfInaction: 5000,
    deliverables: ['Dashboard de métricas', 'Playbook comercial'],
};

export default function ProposalPreviewPage() {
    const [draft, setDraft] = useState<CreateProposalDTO>(BASE_DRAFT);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) {
                return;
            }

            const message = event.data as {
                type?: string;
                payload?: Partial<CreateProposalDTO>;
            };

            if (message.type !== PREVIEW_EVENT_NAME || !message.payload) {
                return;
            }
            const payload = message.payload;

            setDraft((previous) => ({
                ...previous,
                ...payload,
                mainChallenges: payload.mainChallenges ?? previous.mainChallenges,
                expectedOutcomes: payload.expectedOutcomes ?? previous.expectedOutcomes,
                phases: payload.phases ?? previous.phases,
                deliverables: payload.deliverables ?? previous.deliverables,
            }));
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const previewProposal = useMemo(() => {
        const now = new Date();
        const expiresAt = new Date(now);
        expiresAt.setDate(expiresAt.getDate() + 15);

        return {
            id: 'preview-mode',
            createdAt: now,
            expiresAt,
            clientName: draft.clientName || 'Cliente Demo',
            clientCompany: draft.clientCompany || 'Empresa Demo',
            clientRole: draft.clientRole || null,
            clientEmail: draft.clientEmail || null,
            projectName: draft.projectName || 'Proyecto',
            projectObjective: draft.projectObjective || 'Objetivo',
            currentSituation: draft.currentSituation || 'Situación actual',
            mainChallenges: draft.mainChallenges?.length ? draft.mainChallenges : ['Desafío'],
            proposedSolution: draft.proposedSolution || 'Solución propuesta',
            expectedOutcomes: draft.expectedOutcomes?.length ? draft.expectedOutcomes : ['Resultado esperado'],
            timelineMonths: Number(draft.timelineMonths) || 1,
            phases: draft.phases?.length
                ? draft.phases.map((phase, index) => {
                    // Hacer la duración dinámica en base al timeline
                    const total = Number(draft.timelineMonths) || 1;
                    let dynamicDuration = phase.duration;
                    
                    if (draft.phases.length === 2) {
                        if (index === 0) {
                            dynamicDuration = total === 1 ? 'Semanas 1-2' : 'Mes 1';
                        } else {
                            dynamicDuration = total === 1 ? 'Semanas 3-4' : (total === 2 ? 'Mes 2' : `Meses 2 a ${total}`);
                        }
                    }
                    return { ...phase, duration: dynamicDuration };
                })
                : [{ title: 'Fase', description: 'Descripción', duration: 'Duración' }],
            totalInvestment: Number(draft.totalInvestment) || 0,
            roiPercentage: Number(draft.roiPercentage) || 0,
            costOfInaction: Number(draft.costOfInaction) || 0,
            deliverables: draft.deliverables?.length ? draft.deliverables : [],
        };
    }, [draft]);

    const handleSimulatorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setDraft(prev => ({
            ...prev,
            [name]: type === 'number' || type === 'range' ? Number(value) : value
        }));
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {/* Panel lateral del Simulador */}
            <aside style={{
                width: 340,
                background: '#ffffff',
                borderRight: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                position: 'sticky',
                top: 0,
                overflowY: 'auto',
                flexShrink: 0
            }}>
                <div style={{ background: '#f1f5f9', padding: '24px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                        <FiSliders size={18} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#0f172a' }}>Simulador Activo</h2>
                        <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b' }}>Ajusta las variables de la propuesta</p>
                    </div>
                </div>
                
                <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 28 }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, fontWeight: 700, color: '#334155' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FiDollarSign size={15} color="#0284c7" /> Inversión Total</span>
                            <span style={{ color: '#0284c7' }}>${draft.totalInvestment.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <input type="range" name="totalInvestment" min="500" max="35000" step="500" value={draft.totalInvestment} onChange={handleSimulatorChange} style={{ flex: 1, accentColor: '#0284c7' }} />
                            <input type="number" name="totalInvestment" min="500" max="35000" value={draft.totalInvestment} onChange={handleSimulatorChange} style={{ width: 80, padding: '4px 8px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }} />
                        </div>
                    </label>
                    
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, fontWeight: 700, color: '#334155' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FiTrendingUp size={15} color="#059669" /> ROI Estimado</span>
                            <span style={{ color: '#059669' }}>{draft.roiPercentage}%</span>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <input type="range" name="roiPercentage" min="50" max="1000" step="10" value={draft.roiPercentage} onChange={handleSimulatorChange} style={{ flex: 1, accentColor: '#059669' }} />
                            <input type="number" name="roiPercentage" min="50" max="1000" value={draft.roiPercentage} onChange={handleSimulatorChange} style={{ width: 80, padding: '4px 8px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }} />
                        </div>
                    </label>

                    <label style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, fontWeight: 700, color: '#334155' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FiZap size={15} color="#d97706" /> Pérdida por no actuar / Mes</span>
                            <span style={{ color: '#d97706' }}>${draft.costOfInaction.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <input type="range" name="costOfInaction" min="500" max="50000" step="500" value={draft.costOfInaction} onChange={handleSimulatorChange} style={{ flex: 1, accentColor: '#d97706' }} />
                            <input type="number" name="costOfInaction" min="500" max="50000" value={draft.costOfInaction} onChange={handleSimulatorChange} style={{ width: 80, padding: '4px 8px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }} />
                        </div>
                    </label>

                    <label style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, fontWeight: 700, color: '#334155' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FiCalendar size={15} color="#7c3aed" /> Tiempo</span>
                            <span style={{ color: '#7c3aed' }}>{draft.timelineMonths} meses</span>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <input type="range" name="timelineMonths" min="1" max="24" step="1" value={draft.timelineMonths} onChange={handleSimulatorChange} style={{ flex: 1, accentColor: '#7c3aed' }} />
                            <input type="number" name="timelineMonths" min="1" max="24" value={draft.timelineMonths} onChange={handleSimulatorChange} style={{ width: 80, padding: '4px 8px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }} />
                        </div>
                    </label>

                    <div style={{ height: 1, background: '#e2e8f0', margin: '4px 0' }} />

                    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, fontWeight: 700, color: '#334155' }}>
                        Situación Actual (Diagnóstico)
                        <textarea 
                            name="currentSituation" 
                            value={draft.currentSituation} 
                            onChange={handleSimulatorChange} 
                            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12, minHeight: 60, resize: 'vertical', fontFamily: 'inherit', color: '#475569' }} 
                        />
                    </label>

                    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, fontWeight: 700, color: '#334155' }}>
                        Solución Propuesta (Visión)
                        <textarea 
                            name="proposedSolution" 
                            value={draft.proposedSolution} 
                            onChange={handleSimulatorChange} 
                            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12, minHeight: 60, resize: 'vertical', fontFamily: 'inherit', color: '#475569' }} 
                        />
                    </label>
                </div>
            </aside>

            {/* Vista Principal */}
            <main style={{ flex: 1, minWidth: 0 }}>
                <ProposalView proposal={previewProposal} />
            </main>
        </div>
    );
}
