import React, { useState, ChangeEvent } from "react";
import { Trash2, Mic, Upload, Link2, Palette } from "lucide-react";

function VoiceoverForm({ onRemove, instanceId, service }: any) {
    // Local state
    const [duration, setDuration] = useState(""); // minutes
    const [voicePreference, setVoicePreference] = useState("");
    const [notes, setNotes] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [scriptText, setScriptText] = useState("");
    const [pace, setPace] = useState("Normal");
    const [tone, setTone] = useState<string[]>([]);

    // Credits calculation
    const creditsPerMinute = 10;
    const minCredits = 50;
    const minutes = Number(duration) || 0;
    const calculatedCredits = Math.max(minutes * creditsPerMinute, minCredits);

    // Multiple tone/style selection
    const handleToneToggle = (option: string) => {
        setTone((prev) =>
            prev.includes(option)
                ? prev.filter((val) => val !== option)
                : [...prev, option]
        );
    };

    // Handle file upload
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
            setScriptText("");
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden mb-8 backdrop-blur-sm">
            {/* Header */}
            <div className="relative px-8 py-6 bg-gradient-to-r to-transparent border-b border-red-400/30">
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl border border-red-400/30">
                            <Mic className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {service.title} (#{instanceId.slice(-4)})
                        </span>
                    </div>
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition border border-red-400/20 hover:border-red-400/40"
                        onClick={onRemove}
                    >
                        <Trash2 size={16} />
                        <span className="text-sm font-medium">Remove</span>
                    </button>
                </div>
            </div>

            {/* Description & Credits */}
            <div className="px-8 py-4 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-transparent border-b border-gray-700/50">
                <span className="text-gray-300 text-sm font-medium">{service.description}</span>
                <div className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-full">
                    <span className="text-red-300 text-sm font-bold">
                        Credits: {calculatedCredits}
                    </span>
                </div>
            </div>

            {/* Form Body */}
            <div className="px-8 py-8 space-y-8">

                {/* Duration (minutes) */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Mic className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Voiceover Duration (minutes)
                        </label>
                    </div>
                    <input
                        type="number"
                        min={0}
                        className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        placeholder="e.g. 3"
                    />
                </div>

                {/* Voice preference */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Voice Preference
                        </label>
                    </div>
                    <input
                        type="text"
                        className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20"
                        value={voicePreference}
                        onChange={e => setVoicePreference(e.target.value)}
                        placeholder="e.g. Female, British accent, enthusiastic"
                    />
                </div>

                {/* Script input textarea OR upload */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-2">
                                <Upload className="w-4 h-4 text-red-400" />
                                <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Upload Script File
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={handleFileChange}
                                    accept=".txt,.doc,.docx,.pdf"
                                />
                                <div className="flex items-center justify-center w-full h-24 px-6 py-4 border-2 border-dashed border-gray-600/50 rounded-xl bg-gray-800/30 hover:border-red-400/50 hover:bg-gray-800/50 cursor-pointer">
                                    <div className="text-center">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                                        <p className="text-gray-300 font-medium">
                                            {uploadedFile ? uploadedFile.name : "Click or drag to upload .txt/.pdf/.doc"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {uploadedFile && (
                                <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-400/30 rounded-lg text-red-400 text-sm font-medium">
                                    Uploaded: {uploadedFile.name}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-2">
                                <Link2 className="w-4 h-4 text-red-400" />
                                <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Or Paste Script Here
                                </label>
                            </div>
                            <textarea
                                rows={7}
                                className="w-full px-4 py-3 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 resize-none placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20"
                                value={scriptText}
                                onChange={e => {
                                    setScriptText(e.target.value);
                                    setUploadedFile(null);
                                }}
                                placeholder="Paste your script/lines here..."
                            />
                        </div>
                    </div>
                    <div className="text-sm text-gray-400 ml-1">
                        Paste the text, or upload a script file (required)
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

                {/* Pace (radio) */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-red-400" />
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

                {/* Additional notes */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Additional Notes
                        </label>
                    </div>
                    <textarea
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 resize-none placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Any specific requirements (pronunciation, emphasis, mood, etc.)"
                    />
                </div>
            </div>
        </div>
    );
}

export default VoiceoverForm;
