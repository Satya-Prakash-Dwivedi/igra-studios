'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
    }

    // Sign up user
    const { data: signupData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
    })

    if (error) {
        console.log(error)
        redirect('/error')
    }

    // ✅ Create profile row in "profiles" table
    if (signupData.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
            user_id: signupData.user.id,       // maps to user_id
            email: data.email,            // required + unique
            first_name: data.firstName || "",
            last_name: data.lastName || "",
            photo_url: null,              // optional
            company_name: null,
            channel_link: null,           // optional
            wants_email: true,            // default if not provided
        })

        if (profileError) {
            console.error("Profile insert error:", profileError)
            redirect("/error")
        }
    }


    revalidatePath('/', 'layout')
    redirect('/private')
}
