'use server'

import { ProposalService } from '@/services/proposal.service';
import { CreateProposalDTO } from '@/types/proposal';
import { cookies } from 'next/headers';
import { ADMIN_PASSWORD } from '@/lib/constants';

export async function createProposalAction(data: CreateProposalDTO) {
    try {
        const proposal = await ProposalService.createProposal(data);
        return { success: true, id: proposal.id };
    } catch (error) {
        console.error('Error creating proposal:', error);
        return { success: false, error: 'Ocurrió un error al crear la propuesta' };
    }
}

export async function loginAction(password: string) {
    if (password === ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 // 1 day
        });
        return { success: true };
    }
    return { success: false, error: 'Contraseña incorrecta' };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
}
