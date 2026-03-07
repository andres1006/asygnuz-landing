import { Proposal } from '@prisma/client';
import AnimatedSection from './AnimatedSection';

export default function OverviewSection({ proposal }: { proposal: any }) {
    return (
        <AnimatedSection id="overview" className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-[#ffffff10] shadow-2xl relative overflow-hidden group hover:border-[#ffffff20] transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C29B57] to-transparent opacity-50"></div>
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#ffffff10] flex items-center justify-center text-[#C29B57]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h2 className="text-3xl font-light text-white tracking-tight">Resumen Ejecutivo</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div><h3 className="text-[#888888] text-sm uppercase tracking-wider font-semibold mb-3">Proyecto</h3><p className="text-xl text-white font-medium">{proposal.projectName}</p></div>
                <div><h3 className="text-[#888888] text-sm uppercase tracking-wider font-semibold mb-3">Objetivo Principal</h3><p className="text-[#CCCCCC] leading-relaxed text-lg">{proposal.projectObjective}</p></div>
            </div>
        </AnimatedSection>
    );
}
