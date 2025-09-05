"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client" // path to your helper

export default function Logout() {
    const router = useRouter()

    const handleLogout = async () => {
        const client = supabase() // get browser client
        const { error } = await client.auth.signOut()

        if (error) {
            console.error("Logout error:", error.message)
            return
        }

        router.push("/login")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-white mb-4">Ready to Logout?</h1>
                <p className="text-gray-400 mb-8">
                    You can log back in anytime to access your account.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2 rounded-md border border-gray-500 text-gray-300 hover:bg-gray-800 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 rounded-md bg-igrared text-white font-medium hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
