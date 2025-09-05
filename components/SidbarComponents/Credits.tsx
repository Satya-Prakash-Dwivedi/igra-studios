"use client"

import Link from "next/link"

const plans = [
  {
    name: "Starter Plan",
    description: "Perfect for small projects and individual content creators",
    price: 450,
    credits: 500,
    costPerCredit: 0.9,
    popular: false,
  },
  {
    name: "Professional Plan",
    description: "Ideal for regular content creators and small businesses",
    price: 800,
    credits: 1000,
    costPerCredit: 0.8,
    popular: true,
  },
  {
    name: "Enterprise Plan",
    description: "Best value for agencies and high-volume creators",
    price: 1900,
    credits: 2500,
    costPerCredit: 0.76,
    popular: false,
  },
]

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start px-4 py-12">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-8">Credits & Plans</h1>

        {/* Available Credits */}
        <div className="bg-black border border-white/20 rounded-xl p-6 mb-8 flex items-center justify-between">
          <p className="text-white text-lg">Available Credits</p>
          <span className="bg-igrared text-white px-4 py-2 rounded-lg font-medium">
            0
          </span>
        </div>

        {/* Plans */}
        <h2 className="text-xl text-white font-semibold mb-6">Choose a Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border ${plan.popular
                  ? "border-igrared shadow-lg"
                  : "border-white/20"
                } bg-black p-6 flex flex-col justify-between`}
            >
              {plan.popular && (
                <p className="text-igrared text-sm font-semibold mb-3">
                  Most Popular
                </p>
              )}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <p className="text-3xl font-bold text-white mb-2">
                  ${plan.price}
                  <span className="text-lg font-normal text-gray-400">/mo</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {plan.credits} credits (${plan.costPerCredit.toFixed(2)} per
                  credit)
                </p>
              </div>
              <button
                className={`w-full ${plan.popular
                    ? "bg-igrared hover:bg-white hover:text-black"
                    : "border border-white/30 hover:bg-white hover:text-black"
                  } text-white font-medium py-3 rounded-md transition-colors duration-200`}
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>

        {/* Perks */}
        <div className="flex flex-wrap gap-4 mt-10">
          {["Team Online 24/7", "Professional & Fast", "Satisfaction Guarantee", "10K+ Projects Complete"].map(
            (perk) => (
              <span
                key={perk}
                className="px-4 py-2 rounded-full bg-black border border-white/20 text-gray-300 text-sm"
              >
                {perk}
              </span>
            )
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-black border border-white/20 rounded-xl p-6 mt-10">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Transactions
          </h2>
          <p className="text-gray-400 text-sm">
            You don&apos;t have any transactions yet.
          </p>
        </div>
      </div>
    </div>
  )
}
