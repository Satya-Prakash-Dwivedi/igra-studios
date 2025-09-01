import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    console.log("This is supbase get auth users", supabase.auth.getUser())
    if (error || !data?.user) {
        console.log("This is the data that is present it supbase.auth.getUser()", data)
        redirect('/login')
    }

    return <p>Hello {data.user.email}</p>
}