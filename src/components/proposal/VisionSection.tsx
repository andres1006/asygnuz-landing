import AnimatedSection from './AnimatedSection';

export default function VisionSection({ proposal }: { proposal: any }) {
    return (
        <AnimatedSection id="vision" className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-[#ffffff10] shadow-2xl relative overflow-hidden group hover:border-[#ffffff20] transition-colors duration-500 mt-12">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40"></div>
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#ffffff10] flex items-center justify-center text-blue-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h2 className="text-3xl font-light text-white tracking-tight">Visión y Solución</h2>
            </div>
            <div className="space-y-8">
                <div><h3 className="text-[#888888] text-sm uppercase tracking-wider font-semibold mb-3">La Solución</h3><p className="text-[#CCCCCC] leading-relaxed text-lg">{proposal.proposedSolution}</p></div>
                <div>
                    <h3 className="text-[#888888] text-sm uppercase tracking-wider font-semibold mb-4">Resultados Esperados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {proposal.expectedOutcomes.map((outcome: string, i: number) => (
                            <div key={i} className="flex items-start space-x-3 bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
                                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-[#EEEEEE]">{outcome}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
