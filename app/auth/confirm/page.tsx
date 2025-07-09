'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function ConfirmPage() {
    const router = useRouter()
    const params = useSearchParams()

    useEffect(() => {
        const token_hash = params.get('token_hash')
        const type = params.get('type')

        if (token_hash && type) {
            const supabase = createClient()
            supabase.auth.verifyOtp({
                type: type as 'email' | 'signup' | 'recovery' | 'invite' | 'magiclink',
                token_hash,
            }).then(({ error }) => {
                if (error) {
                    router.replace('/login?error=confirm_failed')
                } else {
                    router.replace('/login?confirmed=1')
                }
            })
        } else {
            router.replace('/login?error=invalid_confirm')
        }
    }, [params, router])

    return <div>Confirming your email...</div>
}
