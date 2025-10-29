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

import { supabase } from "@/utils/supabase/client";
import * as tus from 'tus-js-client';

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
    formData: Record<string, any>;
};

// Stage Two UI (next step in order flow)
function StageTwo({ onBack }: { onBack: () => void }) {
    const [selectedServices, setSelectedServices] = useState<ServiceInstance[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    // Add a new instance for a service
    function handleAdd(index: number) {
        const service = services[index];
        let defaultFormData: Record<string, any> = {};

        // --- Set default values for each form ---
        // This is so React can "control" the inputs
        switch (service.title) {
            case "Video":
                defaultFormData = {
                    rawFootageLength: "",
                    finalVideoLength: "",
                    pace: "Normal",
                    tone: [], // Use an empty array for multi-select
                    assetsLink: "",
                    uploadedFile: null, // Will hold the File object
                };
                break;
            case "Thumbnail Design":
                defaultFormData = {
                    thumbnailText: "",
                    note: "",
                    style: null,
                    referenceLink: "",
                    uploadedFile: null,
                };
                break;
            case "Custom Intro":
                defaultFormData = {
                    introTitle: "",
                    duration: "",
                    style: null,
                    animation: false,
                    referenceLink: "",
                    uploadedFile: null,
                };
                break;
            case "Custom Outro":
                defaultFormData = {
                    outroText: "",
                    duration: "",
                    style: null,
                    addMusic: false,
                    referenceLink: "",
                    uploadedFile: null,
                };
                break;
            case "AI Voiceover":
                defaultFormData = {
                    duration: "",
                    voicePreference: "",
                    notes: "",
                    uploadedFile: null,
                    scriptText: "",
                    pace: "Normal",
                    tone: [],
                };
                break;
            case "Script Writing":
                defaultFormData = {
                    scriptType: "YouTube Video",
                    wordCount: "",
                    tone: null,
                    topic: "",
                    uploadedBrief: null,
                    referenceLink: "",
                    notes: "",
                };
                break;
            case "Consultation call":
                defaultFormData = {
                    duration: "15",
                    topics: "",
                    additionalNotes: "",
                    uploadedFile: null,
                    referenceLink: "",
                };
                break;
            case "Custom request":
                defaultFormData = {
                    description: "",
                    uploadedFile: null,
                    referenceLink: "",
                    contact: "",
                };
                break;
        }

        setSelectedServices(prev => [
            ...prev,
            { 
                id: makeId(), 
                serviceIndex: index,
                formData: defaultFormData // <-- Give this instance its blank data
            }
        ]);
    }

    // Remove a specific instance by ID
    function handleRemove(id: string) {
        setSelectedServices(prev => prev.filter(inst => inst.id !== id));
    }

     function handleDataChange(instanceId: string, field: string, value: any) {
        setSelectedServices(prev =>
            prev.map(inst =>
                inst.id === instanceId
                    // Find the right instance, update its formData, and return the new state
                    ? { ...inst, formData: { ...inst.formData, [field]: value } }
                    : inst
            )
        );
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
        const { serviceIndex, id, formData } = instance;
        const service = services[serviceIndex];
        const sharedProps = {
        key: id,
        instanceId: id,
        service,
        onRemove: () => handleRemove(id),
        formData: formData, // <-- Pass the data *down*
        onChange: (field: string, value: any) => handleDataChange(id, field, value), // <-- Pass the handler *down*
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

    // --- 6. handleStripePayment (The "Upload & Pay" logic) ---
    async function handleStripePayment() {
        setIsLoading(true);

        const supabaseClient = supabase();

        // 1. GET PROJECT ID AND SESSION
        const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
        if (!projectId) {
            alert("Supabase Project ID is not configured. Please check your .env.local file.");
            setIsLoading(false);
            return;
        }

        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
        if (sessionError || !session) {
            alert("Could not get user session. Please log in again.");
            setIsLoading(false);
            return;
        }
        const accessToken = session.access_token;

        // This holds the final data we send to Stripe (with URLs, not File objects)
        let finalOrderInstances = JSON.parse(JSON.stringify(selectedServices));

        try {
            // --- 2. UPLOAD FILES ---
            setLoadingMessage("Uploading files, please wait...");

            for (let i = 0; i < finalOrderInstances.length; i++) {
                const instance = selectedServices[i]; // The *real* one with the File object
                const data = instance.formData;
                const service = services[instance.serviceIndex];

                if (data.uploadedFile && data.uploadedFile instanceof File) {
                    const file: File = data.uploadedFile;
                    let fileUrl = "";
                    let bucket = "assets"; // Default bucket for small files
                    let useTus = false;

                    // --- THIS IS THE 100GB LOGIC ---
                    if (service.title === "Video" && file.size > 20 * 1024 * 1024) { // 20MB threshold
                        bucket = "videos"; // Put large files in a 'videos' bucket
                        useTus = true;
                    }

                    const fileExt = file.name.split('.').pop();
                    const filePath = `${Date.now()}.${fileExt}`;

                    if (useTus) {
                        // --- TUS UPLOAD (for 100GB videos) ---
                        setLoadingMessage(`Preparing ${file.name} for upload...`);

                        // Wrap TUS upload in a Promise to use await
                        await new Promise((resolve, reject) => {
                            const upload = new tus.Upload(file, {
                                endpoint: `https://${projectId}.storage.supabase.co/storage/v1/upload/resumable`,
                                retryDelays: [0, 3000, 5000, 10000, 20000],
                                headers: {
                                    authorization: `Bearer ${accessToken}`,
                                    'x-upsert': 'true', // Overwrite existing file
                                },
                                uploadDataDuringCreation: true,
                                removeFingerprintOnSuccess: true,
                                metadata: {
                                    bucketName: bucket,
                                    objectName: filePath,
                                    contentType: file.type || 'application/octet-stream',
                                    cacheControl: '3600',
                                },
                                chunkSize: 6 * 1024 * 1024, // 6MB, as recommended by Supabase
                                onError: (error) => {
                                    console.error('Failed because: ' + error);
                                    reject(new Error(`Tus upload failed: ${error.message}`));
                                },
                                onProgress: (bytesUploaded, bytesTotal) => {
                                    const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
                                    setLoadingMessage(`Uploading ${file.name}: ${percentage}%`);
                                },
                                onSuccess: () => {
                                    console.log(`Tus upload success: ${file.name}`);
                                    resolve(null); // Resolve the promise
                                },
                            });

                            // Check for previous uploads and resume
                            upload.findPreviousUploads().then((previousUploads) => {
                                if (previousUploads.length) {
                                    upload.resumeFromPreviousUpload(previousUploads[0]);
                                }
                                // Start the upload
                                upload.start();
                            });
                        });

                        // If we reach here, the Promise resolved (onSuccess)

                    } else {
                        // --- STANDARD UPLOAD (for small files) ---
                        setLoadingMessage(`Uploading ${file.name}...`);
                        const { data: uploadData, error } = await supabaseClient.storage
                            .from(bucket)
                            .upload(filePath, file);

                        if (error) throw new Error(`Standard upload failed: ${error.message}`);
                    }

                    // Get the public URL for the file we just uploaded (works for both TUS and standard)
                    const { data: { publicUrl } } = supabaseClient.storage
                        .from(bucket)
                        .getPublicUrl(filePath);

                    fileUrl = publicUrl;

                    // Update our final data with the new URL
                    finalOrderInstances[i].formData.uploadedFile = fileUrl;
                }
            }

            // --- 3. CREATE STRIPE SESSION ---
            setLoadingMessage("Redirecting to payment...");

            const stripeRes = await fetch("/api/create-stripe-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderItems: finalOrderInstances,
                    total: usdPrice, // Use the calculated price
                }),
            });

            if (!stripeRes.ok) {
                const { error } = await stripeRes.json();
                throw new Error(error || "Failed to create Stripe session.");
            }

            const { redirectUrl } = await stripeRes.json();

            // --- 4. REDIRECT TO STRIPE ---
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }

        } catch (error: any) {
            console.error(error);
            setIsLoading(false);
            alert("An error occurred: " + error.message);
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
                        className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer flex flex-col hover:bg-gray-900 hover:border-red-300 onse"
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
            <div className="mt-8 py-4 px-6 rounded-lg bg-gray-900 border border-zinc-700 flex flex-col items-end gap-4">
                <div className="text-xl font-bold flex gap-8">
                    <span>Total Credits: {totalCredits}</span>
                    <span>Total: ${usdPrice} USD</span>
                </div>
                
                {isLoading ? (
                    <div className="text-center p-4">
                        <p className="text-lg font-semibold text-white">{loadingMessage}</p>
                        <p className="text-sm text-zinc-400">Please keep this tab open.</p>
                    </div>
                ) : (
                    <button
                        onClick={handleStripePayment}
                        disabled={isLoading || selectedServices.length === 0}
                        className="bg-[#FE4231] text-white rounded-lg px-8 py-3 hover:bg-[#E03A2A] transition-colors font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Processing..." : `Pay $${usdPrice} USD and Submit Order`}
                    </button>
                )}
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
