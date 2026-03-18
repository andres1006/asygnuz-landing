import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = request.nextUrl.pathname === '/admin/login';

    if (isAdminRoute && !isLoginRoute) {
        const session = request.cookies.get('admin_session');
        if (!session || session.value !== 'authenticated') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Si ya tiene session y entra a login, lo redirigimos a cotizador
    if (isLoginRoute) {
        const session = request.cookies.get('admin_session');
        if (session && session.value === 'authenticated') {
            return NextResponse.redirect(new URL('/admin/cotizador', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
