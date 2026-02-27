"use client";

import ApplicationSection from "./ApplicationSection";

export default function LeadModal() {
    const closeModal = () => {
        const modal = document.getElementById('lead-modal');
        if (modal) modal.style.display = 'none';
    };

    return (
        <div id="lead-modal" className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl hidden items-center justify-center p-4 overflow-y-auto">
            <div className="relative w-full max-w-5xl mx-auto bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden my-auto animate-fade-in-up">
                <button 
                    onClick={closeModal}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white z-10 bg-black/50 p-2 rounded-full transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <ApplicationSection />
            </div>
        </div>
    );
}