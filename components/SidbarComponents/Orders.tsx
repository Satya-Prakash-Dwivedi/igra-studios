'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, ArrowLeft } from 'lucide-react';

// Order status type
type OrderStatus = 'add-content-pay' | 'reviewing-order' | 'in-progress' | 'finalizing';

// Mock order data type
interface Order {
    id: string;
    status: OrderStatus;
    title: string;
    date: string;
}

const Orders = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isCreatingOrder = searchParams.get('create') === 'true';

    // Mock orders data - replace with your actual data
    const [orders] = useState<Order[]>([]);

    // Order status configuration
    const statusConfig = {
        'add-content-pay': { label: 'Add Content & Pay', color: 'text-gray-300' },
        'reviewing-order': { label: 'Reviewing Order', color: 'text-[#FF4232]' },
        'in-progress': { label: 'In Progress', color: 'text-[#FF4232]' },
        'finalizing': { label: 'Finalizing', color: 'text-gray-300' },
        'approval': { label: 'Awaiting Your Approval', color: 'text-gray-300' },
        'completed': { label: 'Completed', color: 'text-green-300' },
    };

    // Get order counts for each status
    const getOrderCount = (status: OrderStatus) => {
        return orders.filter(order => order.status === status).length;
    };

    // Handle new order button click
    const handleNewOrder = () => {
        router.push('/orders?create=true');
    };

    // Handle back from create order
    const handleBackFromCreate = () => {
        router.push('/orders');
    };

    // Handle start new order
    const handleStartNewOrder = () => {
        // Navigate to the actual order creation flow
        router.push('/orders/new');
    };

    // Render create order view
    const renderCreateOrderView = () => (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={handleBackFromCreate}
                        className="flex items-center text-gray-300 hover:text-white mr-4"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                    </button>
                    <h1 className="text-2xl font-bold text-white">Let's get started!</h1>
                </div>

                {/* Subtitle */}
                <p className="text-gray-300 mb-8">Choose how you'd like to start your order.</p>

                {/* Progress Steps */}
                <div className="bg-gray-900 rounded-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-[#FF4232] rounded-full"></div>
                            <div className="h-0.5 bg-[#FF4232] w-16 mx-2"></div>
                            <span className="text-[#FF4232] font-medium">Start your order</span>
                        </div>

                        <div className="flex items-center">
                            <div className="h-0.5 bg-gray-600 w-16 mx-2"></div>
                            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                            <div className="h-0.5 bg-gray-600 w-16 mx-2"></div>
                            <span className="text-gray-500">Select packages</span>
                        </div>

                        <div className="flex items-center">
                            <div className="h-0.5 bg-gray-600 w-16 mx-2"></div>
                            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                            <div className="h-0.5 bg-gray-600 w-16 mx-2"></div>
                            <span className="text-gray-500">Finalize details</span>
                        </div>

                        <div className="flex items-center">
                            <div className="h-0.5 bg-gray-600 w-16 mx-2"></div>
                            <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                            <span className="text-gray-500">Confirm order</span>
                        </div>
                    </div>
                </div>

                {/* New Order Card */}
                <div
                    onClick={handleStartNewOrder}
                    className="bg-gray-900 rounded-lg border-2 border-gray-700 hover:border-[#FF4232] transition-colors cursor-pointer"
                >
                    <div className="p-8">
                        <div className="flex items-start">
                            <div className="w-8 h-8 bg-[#FF4232] rounded-lg flex items-center justify-center mr-4 mt-1">
                                <Plus className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">New Order</h3>
                                <p className="text-gray-300">Start a new order from scratch</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render main orders view
    const renderMainOrdersView = () => (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">Your orders</h1>
                    <button
                        onClick={handleNewOrder}
                        className="bg-[#FF4232] hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        New order
                    </button>
                </div>

                {/* Orders Panel */}
                <div className="bg-gray-900 rounded-lg shadow-sm">
                    {/* Status Tabs */}
                    <div className="border-b border-gray-700">
                        <div className="flex">
                            {Object.entries(statusConfig).map(([status, config], index) => (
                                <div key={status} className="flex-1 px-6 py-4 text-center border-r border-gray-700 last:border-r-0">
                                    <div className={`font-medium ${config.color}`}>
                                        {config.label}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-500 mt-1">
                                        {getOrderCount(status as OrderStatus)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Orders Content */}
                    <div className="p-8">
                        {orders.length === 0 ? (
                            <div className="text-center text-gray-400 py-12">
                                <p className="text-lg">No orders found</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="border border-gray-700 rounded-lg p-4 hover:shadow-md hover:border-[#FF4232] transition-all">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-medium text-white">{order.title}</h3>
                                                <p className="text-sm text-gray-400">{order.date}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status].color} bg-gray-800`}>
                                                {statusConfig[order.status].label}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // Render based on current view
    return isCreatingOrder ? renderCreateOrderView() : renderMainOrdersView();
};

export default Orders;