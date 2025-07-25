import { signup } from './actions'
import Link from 'next/link'

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-black border border-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-white text-center mb-8">
                        Create Account
                    </h1>

                    <form action={signup} method="post" className="space-y-6">
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
                                className="w-full px-4 py-3 bg-black border border-white rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

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
                                className="w-full px-4 py-3 bg-black border border-white rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                placeholder="Create a password"
                            />
                        </div>

                        <div className="space-y-4 pt-4">
                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
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