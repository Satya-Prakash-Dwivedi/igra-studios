import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        // run middleware on everything except:
        // - next internals
        // - public assets
        // - favicon
        // - verify-email (our neutral page)
        '/((?!_next/static|_next/image|favicon.ico|verify-email|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
