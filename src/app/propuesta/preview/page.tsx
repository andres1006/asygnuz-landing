'use client';

import { useEffect, useMemo, useState } from 'react';
import ProposalView from '@/components/proposal/ProposalView';
import type { CreateProposalDTO } from '@/types/proposal';

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
                ? draft.phases
                : [{ title: 'Fase', description: 'Descripción', duration: 'Duración' }],
            totalInvestment: Number(draft.totalInvestment) || 0,
            roiPercentage: Number(draft.roiPercentage) || 0,
            costOfInaction: Number(draft.costOfInaction) || 0,
            deliverables: draft.deliverables?.length ? draft.deliverables : [],
        };
    }, [draft]);

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 12,
                    right: 12,
                    zIndex: 999,
                    padding: '6px 10px',
                    borderRadius: 999,
                    background: 'rgba(8,20,44,0.75)',
                    border: '1px solid rgba(125,211,252,0.45)',
                    color: '#67e8f9',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    pointerEvents: 'none',
                }}
            >
                Preview en vivo
            </div>
            <ProposalView proposal={previewProposal} />
        </>
    );
}
