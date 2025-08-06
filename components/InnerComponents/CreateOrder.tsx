'use client';

import React, { useState } from 'react';
import { ArrowLeft, Plus, SquarePlay, Image } from 'lucide-react';
import { title } from 'process';

export default function CreateOrder() {
    // Track the current stage: 'start' or 'details' (you can rename as needed)
    const [stage, setStage] = useState<'start' | 'details'>('start');

    // Handlers to navigate between stages
    const goToDetails = () => setStage('details');
    const goBackToStart = () => setStage('start');

    return (
        <div className="p-5">
            {stage === 'start' && <StageOne onStart={goToDetails} />}
            {stage === 'details' && <StageTwo onBack={goBackToStart} />}
        </div>
    );
}

// Stage One UI (initial screen)
function StageOne({ onStart }: { onStart: () => void }) {
    return (
        <>
            <div className="mb-5">
                <p className="text-2xl font-bold">Let's get started!</p>
                <h3>Choose how you'd like to start your order.</h3>
            </div>

            {/* Order progress tracker: stage one UI */}
            <OrderProgress currentStep={1} />

            <div className="mt-10 bg-gray-900 p-5 gap-3 flex flex-col border-red-400 border-1 rounded-md mb-16 cursor-pointer" onClick={onStart}>
                <Plus color="#FF4232" />
                <p className="font-bold text-2xl">New Order</p>
                <p>Start a new order from scratch</p>
            </div>

            <div>If draft available</div>
        </>
    );
}

// Stage Two UI (next step in order flow)
function StageTwo({ onBack }: { onBack: () => void }) {

    const services = [
        { icon: SquarePlay, title: "Video", description: "20 credits per minute of raw footage (min. 100 credits)" },
        { icon: Image, title: "Thumbnail Design", description: "50 credits per thumbnail" },
        { icon: SquarePlay, title: "Custom Intro", description: "Starting at 100 credits" },
        { icon: SquarePlay, title: "Custom Outro", description: "Starting at 100 credits" },
    ]

    return (
        <>
            {/* Order progress tracker: stage two UI */}
            <OrderProgress currentStep={2} />

            {/* Your stage two content goes here, e.g. form inputs, selections, etc. */}
            <div className="mt-10 flex flex-row gap-5">
                <button onClick={onBack} className="hover:bg-red-100 p-1 rounded-3xl">
                    <ArrowLeft color="#FF4232" />
                </button>
                {/* Placeholder content */}
                <p className="text-3xl font-semibold">What can we do for you?</p>
            </div>

        </>
    );
}

// Shared Order progress tracker component
function OrderProgress({ currentStep }: { currentStep: number }) {
    // Define steps in order flow for render clarity
    const steps = [
        'Start your order',
        'Select packages',
        'Finalize Details',
        'Confirm Order',
    ];

    return (
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber <= currentStep;

                    return (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-3 h-3 rounded-full ${isActive ? 'bg-[#FF4232]' : 'bg-gray-600'
                                    }`}
                            ></div>

                            {index < steps.length - 1 && (
                                <div
                                    className={`h-0.5 mx-2 w-10 ${isActive ? 'bg-[#FF4232]' : 'bg-gray-600'
                                        }`}
                                ></div>
                            )}

                            <span
                                className={`${isActive ? 'text-[#FF4232] font-bold' : 'text-gray-500'
                                    }`}
                            >
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
