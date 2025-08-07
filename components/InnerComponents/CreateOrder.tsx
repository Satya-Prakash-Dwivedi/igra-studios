'use client';

import React, { useState } from 'react';
import { ArrowLeft, Plus, SquarePlay, Image, Mic, NotepadText, Phone, MessageSquareShare } from 'lucide-react';
import VideoForm from '../Forms/VideoForm';
import ThumbnailForm from '../Forms/ThumbnailForm';
import IntroForm from '../Forms/IntroForm';
import OutroForm from '../Forms/OutroForm';
import VoiceoverForm from '../Forms/Voiceover';
import ScriptForm from '../Forms/Script';
import ConsultationForm from '../Forms/Consultation';
import CustomForm from '../Forms/Custom';

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

// Helper function for unique instance IDs
const makeId = () => Math.random().toString(36).slice(2, 11);

// All services, now with a 'credits' property
const services = [
    { icon: SquarePlay, title: "Video", description: "20 credits per minute of raw footage (min. 100 credits)", credits: 100 },
    { icon: Image, title: "Thumbnail Design", description: "50 credits per thumbnail", credits: 50 },
    { icon: SquarePlay, title: "Custom Intro", description: "Starting at 100 credits", credits: 100 },
    { icon: SquarePlay, title: "Custom Outro", description: "Starting at 100 credits", credits: 100 },
    { icon: Mic, title: "AI Voiceover", description: "10 credits per minute (min. 50 credits)", credits: 50 },
    { icon: NotepadText, title: "Script Writing", description: "100 credits per 500 words", credits: 100 },
    { icon: Phone, title: "Consultation call", description: "100 credits per 15 minutes", credits: 100 },
    { icon: MessageSquareShare, title: "Custom request", description: "Let us know what you need", credits: 35 },
];

type ServiceInstance = {
    id: string;
    serviceIndex: number; // Index in services array
    // Optionally: formData: any;
};

// Stage Two UI (next step in order flow)
function StageTwo({ onBack }: { onBack: () => void }) {
    const [selectedServices, setSelectedServices] = useState<ServiceInstance[]>([]);

    // Add a new instance for a service
    function handleAdd(index: number) {
        setSelectedServices(prev => [
            ...prev,
            { id: makeId(), serviceIndex: index }
        ]);
    }

    // Remove a specific instance by ID
    function handleRemove(id: string) {
        setSelectedServices(prev => prev.filter(inst => inst.id !== id));
    }

    // Counter of instances per service
    function getCount(index: number): number {
        return selectedServices.filter(inst => inst.serviceIndex === index).length;
    }

    // Calculate total credits and price (USD) — optionally, you can define a conversion if needed
    const totalCredits = selectedServices.reduce(
        (sum, inst) => sum + (services[inst.serviceIndex]?.credits || 0),
        0
    );
    const usdPrice = totalCredits; // If 1 credit = 1 USD. Adjust if different.

    // Helper to render the correct form
    function renderForm(instance: ServiceInstance) {
        const { serviceIndex, id } = instance;
        const service = services[serviceIndex];
        const sharedProps = {
            key: id,
            instanceId: id,
            service,
            onRemove: () => handleRemove(id),
        };
        // Switch on serviceIndex (or title). Easy to maintain.
        switch (serviceIndex) {
            case 0: return <VideoForm {...sharedProps} />;
            case 1: return <ThumbnailForm {...sharedProps} />;
            case 2: return <IntroForm {...sharedProps} />;
            case 3: return <OutroForm {...sharedProps} />;
            case 4: return <VoiceoverForm {...sharedProps} />;
            case 5: return <ScriptForm {...sharedProps} />;
            case 6: return <ConsultationForm {...sharedProps} />;
            case 7: return <CustomForm {...sharedProps} />;
            default:
                return (
                    <div key={id} className="p-6 border rounded bg-gray-900 flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold">{service.title}</span>
                            <button
                                className="text-red-500 hover:underline ml-4 text-sm"
                                onClick={() => handleRemove(id)}
                            >
                                Remove
                            </button>
                        </div>
                        <p className="text-gray-400">{service.description}</p>
                    </div>
                );
        }
    }

    return (
        <>
            <OrderProgress currentStep={2} />

            <div className="my-10 flex flex-row gap-5">
                <button onClick={onBack} className="hover:bg-red-100 p-1 rounded-3xl">
                    <ArrowLeft color="#FF4232" />
                </button>
                <p className="text-3xl font-semibold">What can we do for you?</p>
            </div>

            {/* Service cards grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                {services.map(({ icon: Icon, title, description }, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer flex flex-col hover:bg-gray-900 hover:border-red-300"
                    >
                        <div className="mb-2">
                            <Icon size={24} />
                        </div>
                        <h3 className="font-semibold text-lg">{title}</h3>
                        <p className="text-gray-500 text-sm flex-grow">{description}</p>
                        <p className="text-xs text-gray-400 mt-2">Credits: {services[index].credits}</p>
                        <button
                            onClick={() => handleAdd(index)}
                            className="mt-4 bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition-colors font-bold"
                        >
                            Add {title} {getCount(index) > 0 && `(${getCount(index)})`}
                        </button>
                    </div>
                ))}
            </div>

            {/* Render forms for each selected service instance */}
            <div className="mt-12 flex flex-col gap-6">
                {selectedServices.map(renderForm)}
            </div>

            {/* Order summary: credits and total price */}
            <div className="mt-8 py-3 px-6 text-xl font-bold flex justify-end gap-8">
                <span>Total Credits: {totalCredits}</span>
                <span>Total: ${usdPrice} USD</span>
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
