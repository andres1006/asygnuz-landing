import { Proposal } from '@prisma/client';
import AnimatedSection from './AnimatedSection';
import AnimatedCounter from './AnimatedCounter';

export default function InvestmentSection({ proposal }: { proposal: any }) {
    return (
        <AnimatedSection id="investment" className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-[#ffffff10] shadow-2xl relative overflow-hidden group hover:border-[#ffffff20] transition-colors duration-500 mt-12 mb-32">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C29B57] to-transparent opacity-60"></div>
            <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#ffffff10] flex items-center justify-center text-[#C29B57]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="text-3xl font-light text-white tracking-tight">Inversión y Retorno</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111111] p-8 rounded-2xl border border-[#ffffff05] flex flex-col items-center justify-center text-center">
                    <span className="text-[#888888] text-sm uppercase tracking-wider font-semibold mb-4">Inversión Total</span>
                    <span className="text-4xl font-bold text-white tracking-tight"><AnimatedCounter value={proposal.totalInvestment} prefix="$" /></span>
                </div>
                <div className="bg-[#C29B57]/10 p-8 rounded-2xl border border-[#C29B57]/20 flex flex-col items-center justify-center text-center transform md:-translate-y-4 shadow-[0_0_30px_rgba(194,155,87,0.1)]">
                    <span className="text-[#C29B57] text-sm uppercase tracking-wider font-semibold mb-4">ROI Estimado</span>
                    <span className="text-5xl font-bold text-white tracking-tight"><AnimatedCounter value={proposal.roiPercentage} suffix="%" /></span>
                </div>
                <div className="bg-[#111111] p-8 rounded-2xl border border-[#ffffff05] flex flex-col items-center justify-center text-center">
                    <span className="text-[#888888] text-sm uppercase tracking-wider font-semibold mb-4">Costo Mensual Inacción</span>
                    <span className="text-4xl font-bold text-red-400 tracking-tight"><AnimatedCounter value={proposal.costOfInaction} prefix="$" /></span>
                </div>
            </div>

            <div className="mt-12 text-center">
                <p className="text-[#888888] text-sm mb-6 max-w-2xl mx-auto">Vigencia operativa de la propuesta: 15 días. Las condiciones descritas son confidenciales.</p>
                <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-neutral-200 transition-colors">
                    Agendar Firma de Contrato
                </button>
            </div>
        </AnimatedSection>
    );
}
