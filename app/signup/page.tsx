import { signup } from './actions'
import Link from 'next/link'

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-black border border-white/20 rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-white text-center mb-8">
                        Create Account
                    </h1>

                    <form action={signup} method="post" className="space-y-6">
                        {/* First Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="firstName"
                                className="block text-white text-sm font-medium"
                            >
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-colors"
                                placeholder="Enter your first name"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="lastName"
                                className="block text-white text-sm font-medium"
                            >
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-colors"
                                placeholder="Enter your last name"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-white text-sm font-medium"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-white text-sm font-medium"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-colors"
                                placeholder="Create a password"
                            />
                        </div>

                        {/* Submit */}
                        <div className="space-y-4 pt-4">
                            <button
                                type="submit"
                                className="w-full bg-igrared text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                            >
                                Create Account
                            </button>

                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-3">
                                    Already have an account?
                                </p>
                                <Link
                                    href="/login"
                                    className="inline-block w-full bg-black border border-white text-white font-medium py-3 px-4 rounded-md hover:bg-white hover:text-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black text-center"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
