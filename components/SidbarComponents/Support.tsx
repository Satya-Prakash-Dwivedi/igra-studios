"use client"

import { MessageCircle, BookOpen, FileText, Video } from "lucide-react"
import { useRouter } from "next/navigation"

const supportOptions = [
    {
        title: "Live Chat Support",
        description: "Get in touch with the team now",
        icon: MessageCircle,
        available: true,
    },
    {
        title: "Documentation",
        description: "Browse our comprehensive guides",
        icon: FileText,
        available: false,
    },
    {
        title: "Video Tutorials",
        description: "Learn through step-by-step videos",
        icon: Video,
        available: false,
    },
    {
        title: "Knowledge Base",
        description: "Find answers to common questions",
        icon: BookOpen,
        available: false,
    },
]

export default function SupportPage() {

    const router = useRouter();

    const handleChat = () => {
        router.push('/?tab=Messages')
    }

    return (
        <div className="min-h-screen bg-black flex flex-col items-center px-4 py-12">
            <div className="w-full max-w-5xl">
                {/* Header */}
                <h1 className="text-3xl font-bold text-white mb-4">Support</h1>
                <p className="text-gray-400 mb-10 max-w-2xl">
                    Need help with a specific order, payment, or have a question about the
                    app? We&apos;re here to help.
                </p>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {supportOptions.map((option) => (
                        <div
                            key={option.title}
                            className={`rounded-xl p-6 border transition ${option.available
                                    ? "border-igrared bg-black hover:bg-igrared/20 cursor-pointer"
                                    : "border-white/10 bg-black opacity-50 cursor-not-allowed"
                                }`}
                            onClick={() => {
                                if (option.available && option.title === "Live Chat Support") {
                                    handleChat();
                                }
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <option.icon
                                    className={`w-6 h-6 ${option.available ? "text-igrared" : "text-gray-500"
                                        }`}
                                />
                                <div>
                                    <h3
                                        className={`text-lg font-semibold ${option.available ? "text-white" : "text-gray-500"
                                            }`}
                                    >
                                        {option.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">{option.description}</p>
                                    {!option.available && (
                                        <span className="text-xs text-gray-500 font-medium">
                                            Coming Soon
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Support Ticket Button */}
                <div className="mt-10">
                    <button className="px-6 py-3 bg-igrared text-white rounded-md font-medium hover:bg-white hover:text-black transition-colors">
                        Create Support Ticket
                    </button>
                </div>
            </div>
        </div>
    )
}
