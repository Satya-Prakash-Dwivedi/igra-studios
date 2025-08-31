import React, { useState, ChangeEvent } from "react";
import { Trash2, NotepadText, Upload, Link2, Palette } from "lucide-react";

function ScriptForm({ onRemove, instanceId, service }: any) {
    const [scriptType, setScriptType] = useState<string>("YouTube Video");
    const [wordCount, setWordCount] = useState("");
    const [tone, setTone] = useState<string | null>(null);
    const [topic, setTopic] = useState("");
    const [uploadedBrief, setUploadedBrief] = useState<File | null>(null);
    const [referenceLink, setReferenceLink] = useState("");
    const [notes, setNotes] = useState("");

    const scriptTypes = [
        "YouTube Video",
        "Ad Script",
        "Educational",
        "Podcast",
        "Explainer",
        "Other"
    ];
    const toneOptions = [
        "Funny", "Serious", "Professional", "Casual", "Epic", "Motivational"
    ];

    // Handle file upload
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedBrief(e.target.files[0]);
            setReferenceLink("");
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden mb-8 backdrop-blur-sm">
            {/* Header */}
            <div className="relative px-8 py-6 bg-gradient-to-r to-transparent border-b border-red-400/30">
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl border border-red-400/30">
                            <NotepadText className="w-5 h-5 text-red-400" />
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
                        Credits: {service.credits}
                    </span>
                </div>
            </div>

            {/* Form Body */}
            <div className="px-8 py-8 space-y-8">
                {/* Script Topic */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <NotepadText className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Script Topic / Title
                        </label>
                    </div>
                    <input
                        type="text"
                        className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all"
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        placeholder="E.g. 'How to grow on YouTube in 2024'"
                    />
                </div>

                {/* Script Type (single select, like tone group pills) */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <NotepadText className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Script Type
                        </label>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {scriptTypes.map(type => (
                            <button
                                type="button"
                                key={type}
                                onClick={() => setScriptType(type)}
                                className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-200 backdrop-blur-sm ${scriptType === type
                                        ? "bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white shadow-lg shadow-red-500/25 scale-105"
                                        : "bg-gray-800/50 border-gray-600/50 text-gray-300 hover:border-red-400/50 hover:bg-gray-700/50 hover:text-white"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Word Count */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <NotepadText className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Approximate Word Count
                        </label>
                    </div>
                    <input
                        type="number"
                        min={0}
                        className="w-40 px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all"
                        value={wordCount}
                        onChange={e => setWordCount(e.target.value)}
                        placeholder="e.g. 800"
                    />
                </div>

                {/* Tone (single select) */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Tone
                        </label>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {toneOptions.map(t => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setTone(t)}
                                className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-200 backdrop-blur-sm ${tone === t
                                        ? "bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white shadow-lg shadow-red-500/25 scale-105"
                                        : "bg-gray-800/50 border-gray-600/50 text-gray-300 hover:border-red-400/50 hover:bg-gray-700/50 hover:text-white"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload Brief & Reference Link side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload File */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Upload className="w-4 h-4 text-red-400" />
                            <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Upload Brief / Example
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={handleFileChange}
                                accept=".txt,.pdf,.doc,.docx"
                            />
                            <div className="flex items-center justify-center w-full h-24 px-6 py-4 border-2 border-dashed border-gray-600/50 rounded-xl bg-gray-800/30 hover:border-red-400/50 hover:bg-gray-800/50 transition-all cursor-pointer">
                                <div className="text-center">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                                    <p className="text-gray-300 font-medium">
                                        {uploadedBrief ? uploadedBrief.name : "Click or drag to upload .txt/.pdf/.doc"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {uploadedBrief && (
                            <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-400/30 rounded-lg text-red-400 text-sm font-medium">
                                Uploaded: {uploadedBrief.name}
                            </div>
                        )}
                    </div>
                    {/* Reference Link */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Link2 className="w-4 h-4 text-red-400" />
                            <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Reference Link
                            </label>
                        </div>
                        <input
                            type="url"
                            className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all"
                            value={referenceLink}
                            onChange={(e) => {
                                setUploadedBrief(null);
                                setReferenceLink(e.target.value);
                            }}
                            placeholder="https://example.com/sample-video-script"
                        />
                        <p className="text-sm text-gray-400 ml-1">
                            Paste a sample or inspiration link (optional)
                        </p>
                    </div>
                </div>

                {/* Additional Notes */}
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
                        placeholder="Anything specific? Example, call to action, references, brand voice, etc."
                    />
                </div>
            </div>
        </div>
    );
}

export default ScriptForm;
