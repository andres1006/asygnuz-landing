import { ProposalService } from '@/services/proposal.service';
import { notFound } from 'next/navigation';
import ExpiredView from '@/components/proposal/ExpiredView';
import ProposalView from '@/components/proposal/ProposalView';

export const dynamic = 'force-dynamic';

interface Props {
    params: {
        id: string;
    }
}

export default async function PropuestaPage({ params }: Props) {
    const proposal = await ProposalService.getProposalById(params.id);

    if (!proposal) {
        notFound();
    }

    if (new Date() > proposal.expiresAt) {
        return <ExpiredView />;
    }

    return <ProposalView proposal={proposal} />;
}
