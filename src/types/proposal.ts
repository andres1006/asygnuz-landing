export interface ProposalPhase {
    title: string;
    description: string;
    duration: string;
}

export interface CreateProposalDTO {
    clientName: string;
    clientCompany: string;
    clientRole?: string;
    clientEmail?: string;

    projectName: string;
    projectObjective: string;

    currentSituation: string;
    mainChallenges: string[];

    proposedSolution: string;
    expectedOutcomes: string[];

    timelineMonths: number;
    phases: ProposalPhase[];

    totalInvestment: number;
    roiPercentage: number;
    costOfInaction: number;
    deliverables?: string[];
}
