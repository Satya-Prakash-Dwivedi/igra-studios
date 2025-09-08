'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { supabaseAdmin } from '@/utils/supabase/admin' // 👈 new admin client

export async function signup(formData: FormData) {
    const supabase = await createClient() // normal anon client for auth

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
    }

    console.log("➡️ Signup attempt with data:", data)

    // Step 1: Sign up user
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
    })

    if (signupError) {
        console.error("❌ Signup error:", signupError)
        redirect('/error')
    }

    console.log("✅ Signup success:", signupData)

    // Step 2: Insert into profiles table using service role
    if (signupData.user) {
        console.log("➡️ Inserting profile for user:", signupData.user.id)
        console.log('Using service role key?', !!process.env.SUPABASE_SERVICE_ROLE_KEY)


        const { data: profileInsertData, error: profileError } = await supabaseAdmin
            .from("profiles")
            .insert({
                user_id: signupData.user.id,
                email: data.email,
                first_name: data.firstName || "",
                last_name: data.lastName || "",
                photo_url: null,
                company_name: null,
                wants_email: true,
            })
            .select()  // returns inserted row

        if (profileError) {
            console.error("❌ Profile insert error:", profileError)
            redirect("/error")
        }

        console.log("✅ Profile inserted:", profileInsertData)
    } else {
        console.warn("⚠️ signupData.user is missing, skipping profile insert")
    }

    // Step 3: Redirect
    revalidatePath('/', 'layout')
    console.log("➡️ Redirecting to /verify-email")
    redirect('/verify-email')
}
