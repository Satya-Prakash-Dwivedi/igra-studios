'use client'

import { useRouter } from "next/navigation";

export default function ErrorPage() {
    const router = useRouter();

    const handleRefresh = () => {
        router.replace("/signup")
    }

    return (
        <div className="flex flex-col h-screen w-screen items-center justify-center bg-black text-white px-6">
            {/* Error Icon */}
            <div className="mb-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600/20 text-red-500 text-3xl">
                    ⚠️
                </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-3">
                Oops! Something went wrong
            </h2>

            {/* Subtitle */}
            <p className="text-gray-400 text-center max-w-md mb-8">
                We hit a snag while loading this page. Please try again or return home.
            </p>

            {/* Actions */}
            <div className="flex space-x-4">
                <button
                    onClick={handleRefresh}
                    className="px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition-colors"
                >
                    Retry
                </button>
                {/* <button
                    onClick={() => router.push("/")}
                    className="px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
                >
                    Go Home
                </button> */}
            </div>
        </div>
    );
}
