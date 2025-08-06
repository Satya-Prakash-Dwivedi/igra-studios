import React, { useState } from 'react';
import { User, Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const Dashboard = () => {
    const [activeOrders] = useState(0);
    const [inRevision] = useState(0);
    const [completed] = useState(0);
    const [showProfileTooltip, setShowProfileTooltip] = useState(false);

    return (
        <div className="w-full h-full bg-black text-white">
            <div className="w-full h-full p-3 sm:p-4 lg:p-5">
                {/* Profile Setup Section */}
                <div className="w-full bg-slate-800 rounded-xl p-5 sm:p-6 mb-5 sm:mb-6 border border-slate-700 shadow-xl">
                    <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">
                        Finish your profile setup
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-5 leading-relaxed">
                        Finish onboarding in just a minute so we know how to serve your needs best.
                    </p>

                    <button
                        className="group relative bg-slate-700 hover:bg-slate-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-slate-600 hover:border-slate-500 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                        onMouseEnter={() => setShowProfileTooltip(true)}
                        onMouseLeave={() => setShowProfileTooltip(false)}
                    >
                        <User className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                        <span className="text-sm">My profile</span>

                        {showProfileTooltip && (
                            <div className="absolute -top-12 left-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-gray-700 z-10">
                                Complete your profile setup
                                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                            </div>
                        )}
                    </button>
                </div>

                {/* Welcome Section */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                            Welcome back, Satya!
                        </h2>
                        <p className="text-gray-400 text-base sm:text-lg">
                            Here's what's happening with your orders
                        </p>
                    </div>

                    <button className="group bg-[#FF4232] hover:bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center gap-2 transform hover:scale-105 whitespace-nowrap">
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        <span className="text-sm">New order</span>
                    </button>
                </div>

                {/* Order Status Cards - Full Width Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
                    {/* Active Orders */}
                    <div className="group bg-slate-800 p-4 sm:p-5 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 w-full">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="p-2 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-200">Active Orders</h3>
                        </div>
                        <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">{activeOrders}</div>
                        <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200"></div>
                        </div>
                    </div>

                    {/* In Revision */}
                    <div className="group bg-slate-800 p-4 sm:p-5 rounded-xl border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 w-full">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="p-2 bg-yellow-500/20 rounded-full group-hover:bg-yellow-500/30 transition-colors">
                                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-200">In Revision</h3>
                        </div>
                        <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">{inRevision}</div>
                        <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200"></div>
                        </div>
                    </div>

                    {/* Completed */}
                    <div className="group bg-slate-800 p-4 sm:p-5 rounded-xl border border-slate-700 hover:border-green-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 w-full sm:col-span-2 xl:col-span-1">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="p-2 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-200">Completed</h3>
                        </div>
                        <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">{completed}</div>
                        <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200"></div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders Section - Full Width */}
                <div className="w-full bg-slate-800 rounded-xl p-5 sm:p-6 border border-slate-700 shadow-xl">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-white">
                        Your recent orders
                    </h3>

                    <div className="flex flex-col items-center justify-center py-8 sm:py-10">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-lg">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-slate-500 border-dashed rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-slate-500 rounded-full opacity-50"></div>
                            </div>
                        </div>

                        <p className="text-gray-400 text-base sm:text-lg text-center max-w-md leading-relaxed mb-4 sm:mb-6">
                            Once you've placed an order, it'll appear here.
                        </p>

                        <button className="bg-[#FF4232] hover:bg-red-500 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 font-medium text-sm transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
                            Create your first order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;