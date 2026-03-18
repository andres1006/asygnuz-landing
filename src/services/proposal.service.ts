import { prisma } from '@/lib/prisma';
import { CreateProposalDTO } from '@/types/proposal';

export class ProposalService {
    static async createProposal(data: CreateProposalDTO) {
        // Expira en 15 dias
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 15);

        const proposal = await prisma.proposal.create({
            data: {
                clientName: data.clientName,
                clientCompany: data.clientCompany,
                clientRole: data.clientRole || null,
                clientEmail: data.clientEmail || null,
                projectName: data.projectName,
                projectObjective: data.projectObjective,
                currentSituation: data.currentSituation,
                mainChallenges: JSON.stringify(data.mainChallenges),
                proposedSolution: data.proposedSolution,
                expectedOutcomes: JSON.stringify(data.expectedOutcomes),
                timelineMonths: data.timelineMonths,
                phases: JSON.stringify(data.phases),
                totalInvestment: data.totalInvestment,
                roiPercentage: data.roiPercentage,
                costOfInaction: data.costOfInaction,
                deliverables: data.deliverables ? JSON.stringify(data.deliverables) : null,
                expiresAt
            }
        });

        return proposal;
    }

    static async getProposalById(id: string) {
        const proposal = await prisma.proposal.findUnique({
            where: { id }
        });

        if (!proposal) return null;

        // Deserializar campos JSON
        return {
            ...proposal,
            mainChallenges: JSON.parse(proposal.mainChallenges) as string[],
            expectedOutcomes: JSON.parse(proposal.expectedOutcomes) as string[],
            phases: JSON.parse(proposal.phases) as { title: string, description: string, duration: string }[],
            deliverables: proposal.deliverables ? JSON.parse(proposal.deliverables) as string[] : undefined
        };
    }
}
