export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-black border border-white/20 rounded-2xl shadow-lg p-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-6">
                        Verify Your Email
                    </h1>
                    <p className="text-gray-300 mb-6">
                        We’ve sent you a login link. Please check your email and follow the
                        instructions to complete your signup.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Didn’t get the email? Check your spam folder or try signing up again.
                    </p>
                </div>
            </div>
        </div>
    )
}
