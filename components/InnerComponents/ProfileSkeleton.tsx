// components/ProfileSkeleton.tsx
export default function ProfileSkeleton() {
    return (
        <div className="min-h-screen bg-black text-white p-12">
            <div className="max-w-4xl mx-auto w-full space-y-10 animate-pulse">
                {/* Profile Photo */}
                <div className="flex items-center space-x-6">
                    {/* Circle shimmer instead of square */}
                    <div className="w-24 h-24 rounded-full bg-zinc-800" />
                    <div className="space-y-3">
                        <div className="w-28 h-6 rounded-md bg-zinc-800" />
                        <div className="w-20 h-5 rounded-md bg-zinc-800" />
                    </div>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="h-14 rounded-lg bg-zinc-800" />
                    <div className="h-14 rounded-lg bg-zinc-800" />
                </div>

                <div className="h-14 rounded-lg bg-zinc-800 w-1/2" />
                <div className="h-14 rounded-lg bg-zinc-800 w-full" />

                {/* Buttons */}
                <div className="flex space-x-6">
                    <div className="h-12 w-40 rounded-lg bg-zinc-800" />
                    <div className="h-12 w-40 rounded-lg bg-zinc-800" />
                </div>

                {/* Save Button */}
                <div className="h-12 w-44 rounded-xl bg-[#FF4232]/70" />
            </div>
        </div>
    );
}
