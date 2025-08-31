import React, { useState, ChangeEvent } from "react";
import { ArrowLeft, Trash2, UploadCloud, Upload, Link2, Clock, Zap, Palette } from "lucide-react";

function VideoForm({ onRemove, instanceId, service }: any) {
    // Local form state
    const [rawFootageLength, setRawFootageLength] = useState("");
    const [finalVideoLength, setFinalVideoLength] = useState("");
    const [pace, setPace] = useState("Normal"); // Slow, Normal, Fast, Super
    const [tone, setTone] = useState<string[]>([]); // Multiple choices
    const [assetsLink, setAssetsLink] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // For credits calculation (example: 20 credits per minute of raw, min 100)
    const creditsPerMinute = 20;
    const minCredits = 100;
    const rawMinutes = Number(rawFootageLength) || 0;
    const calculatedCredits = Math.max(rawMinutes * creditsPerMinute, minCredits);

    // Handle tone option toggle (multiple)
    const handleToneToggle = (option: string) => {
        setTone((prev) =>
            prev.includes(option)
                ? prev.filter((val) => val !== option)
                : [...prev, option]
        );
    };

    // Handle file input
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden mb-8 backdrop-blur-sm">
            {/* Header with gradient */}
            <div className="relative px-8 py-6 bg-gradient-to-r to-transparent border-b border-red-400/30">
                <div className="absolute inset-0 "></div>
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl backdrop-blur-sm border border-red-400/30">
                            <UploadCloud className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {service.title} (#{instanceId.slice(-4)})
                        </span>
                    </div>
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 backdrop-blur-sm border border-red-400/20 hover:border-red-400/40"
                        onClick={onRemove}
                    >
                        <Trash2 size={16} />
                        <span className="text-sm font-medium">Remove</span>
                    </button>
                </div>
            </div>

            {/* Service Description & Credits */}
            <div className="px-8 py-4 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-transparent border-b border-gray-700/50">
                <span className="text-gray-300 text-sm font-medium">{service.description}</span>
                <div className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-full">
                    <span className="text-red-300 text-sm font-bold">
                        Credits: {calculatedCredits}
                    </span>
                </div>
            </div>

            <div className="px-8 py-8 space-y-8">
                {/* Link to files */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Link2 className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Link to your assets
                        </label>
                    </div>
                    <input
                        type="url"
                        className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all duration-200"
                        value={assetsLink}
                        onChange={(e) => setAssetsLink(e.target.value)}
                        placeholder="https://drive.google.com/..."
                    />
                    <p className="text-sm text-gray-400 ml-1">Google Drive or Dropbox link (optional)</p>
                </div>

                {/* File upload */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Upload className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Upload Files
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={handleFileChange}
                            accept="video/*,image/*"
                        />
                        <div className="flex items-center justify-center w-full h-32 px-6 py-4 border-2 border-dashed border-gray-600/50 rounded-xl bg-gray-800/30 backdrop-blur-sm hover:border-red-400/50 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer">
                            <div className="text-center">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-300 font-medium">
                                    {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                                </p>
                                <p className="text-sm text-gray-500">Video or image files</p>
                            </div>
                        </div>
                    </div>
                    {uploadedFile && (
                        <div className="flex items-center space-x-2 p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm text-green-400 font-medium">Uploaded: {uploadedFile.name}</span>
                        </div>
                    )}
                </div>

                {/* Length inputs - side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-red-400" />
                            <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Raw Footage Length (minutes)
                            </label>
                        </div>
                        <input
                            type="number"
                            min={0}
                            className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all duration-200"
                            value={rawFootageLength}
                            onChange={(e) => setRawFootageLength(e.target.value)}
                            placeholder="e.g. 30"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-red-400" />
                            <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Desired Final Video Length (minutes)
                            </label>
                        </div>
                        <input
                            type="number"
                            min={0}
                            className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all duration-200"
                            value={finalVideoLength}
                            onChange={(e) => setFinalVideoLength(e.target.value)}
                            placeholder="e.g. 5"
                        />
                    </div>
                </div>

                {/* Tone (multi-select) */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Tone & Style
                        </label>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {["Funny", "Serious", "Professional", "Elegant", "Casual", "Informational"].map((t) => (
                            <button
                                type="button"
                                key={t}
                                onClick={() => handleToneToggle(t)}
                                className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-200 backdrop-blur-sm ${tone.includes(t)
                                    ? "bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white shadow-lg shadow-red-500/25 scale-105"
                                    : "bg-gray-800/50 border-gray-600/50 text-gray-300 hover:border-red-400/50 hover:bg-gray-700/50 hover:text-white"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pace (radio select) */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Pace
                        </label>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {["Slow", "Normal", "Fast", "Super"].map((p) => (
                            <label
                                key={p}
                                className={`px-6 py-3 rounded-full cursor-pointer text-sm font-semibold transition-all duration-200 backdrop-blur-sm border ${pace === p
                                    ? "bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white shadow-lg shadow-red-500/25 scale-105"
                                    : "bg-gray-800/50 border-gray-600/50 text-gray-300 hover:border-red-400/50 hover:bg-gray-700/50 hover:text-white"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name={`pace-${instanceId}`}
                                    value={p}
                                    checked={pace === p}
                                    onChange={() => setPace(p)}
                                    className="sr-only"
                                />
                                {p}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoForm;