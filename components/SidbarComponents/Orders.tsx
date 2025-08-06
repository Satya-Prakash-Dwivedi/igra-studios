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
        router.push('/?tab=Create order');
    };

    // Render main orders view
    return (
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
};

export default Orders;