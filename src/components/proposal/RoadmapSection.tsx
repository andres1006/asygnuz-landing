import { Proposal } from '@prisma/client';
import AnimatedSection from './AnimatedSection';

export default function RoadmapSection({ proposal }: { proposal: any }) {
    return (
        <AnimatedSection id="roadmap" className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-[#ffffff10] shadow-2xl relative overflow-hidden group hover:border-[#ffffff20] transition-colors duration-500 mt-12">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-40"></div>
            <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#ffffff10] flex items-center justify-center text-emerald-500">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                </div>
                <div>
                    <h2 className="text-3xl font-light text-white tracking-tight">Hoja de Ruta (Roadmap)</h2>
                    <p className="text-[#888888] mt-1">Duración estimada: {proposal.timelineMonths} {proposal.timelineMonths === 1 ? 'Mes' : 'Meses'}</p>
                </div>
            </div>
            <div className="relative border-l border-[#333333] ml-6 pl-8 space-y-12">
                {proposal.phases.map((phase: any, i: number) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#0a0a0a] border-2 border-emerald-500"></div>
                        <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase block mb-2">{phase.duration}</span>
                        <h3 className="text-xl font-medium text-white mb-3">{phase.title}</h3>
                        <p className="text-[#AAAAAA] leading-relaxed">{phase.description}</p>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
}
