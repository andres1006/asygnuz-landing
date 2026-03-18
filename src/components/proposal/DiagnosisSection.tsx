import { Proposal } from '@prisma/client';
import AnimatedSection from './AnimatedSection';

export default function DiagnosisSection({ proposal }: { proposal: any }) {
    return (
        <AnimatedSection id="diagnosis" className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-[#ffffff10] shadow-2xl relative overflow-hidden group hover:border-[#ffffff20] transition-colors duration-500 mt-12">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#ffffff10] flex items-center justify-center text-red-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h2 className="text-3xl font-light text-white tracking-tight">Diagnóstico Actual</h2>
            </div>
            <div className="space-y-8">
                <div><h3 className="text-[#888888] text-sm uppercase tracking-wider font-semibold mb-3">Situación Principal</h3><p className="text-[#CCCCCC] leading-relaxed text-lg">{proposal.currentSituation}</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {proposal.mainChallenges.map((challenge: string, i: number) => (
                        <div key={i} className="flex items-start space-x-3 bg-[#111111] p-4 rounded-xl border border-[#ffffff05]">
                            <svg className="w-5 h-5 text-red-500/70 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            <span className="text-[#DDDDDD]">{challenge}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
