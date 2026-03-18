import { Proposal } from '@prisma/client';
import AnimatedSection from './AnimatedSection';

export default function PartnershipSection({ proposal }: { proposal: any }) {
    if (!proposal.deliverables || proposal.deliverables.length === 0) return null;
    return (
        <AnimatedSection id="partnership" className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-[#ffffff10] shadow-2xl relative overflow-hidden group hover:border-[#ffffff20] transition-colors duration-500 mt-12">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40"></div>
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#ffffff10] flex items-center justify-center text-purple-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h2 className="text-3xl font-light text-white tracking-tight">Entregables Clave</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proposal.deliverables.map((item: string, i: number) => (
                    <div key={i} className="bg-[#111111] p-6 rounded-2xl border border-[#ffffff05] flex items-center space-x-4">
                        <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                        <span className="text-[#DDDDDD]">{item}</span>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
}
