import React, { useState, ChangeEvent } from "react";
import { Trash2, SquarePlay, Upload, Link2, Palette, Zap } from "lucide-react";

function OutroForm({ onRemove, instanceId, service }: any) {
    const [outroText, setOutroText] = useState("");
    const [duration, setDuration] = useState("");
    const [style, setStyle] = useState<string | null>(null);
    const [referenceLink, setReferenceLink] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [addMusic, setAddMusic] = useState(false);

    const styleOptions = [
        "Minimalist", "Bold", "Cinematic", "Modern", "Clean", "Animated"
    ];

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
            setReferenceLink("");
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden mb-8 backdrop-blur-sm">
            {/* Header */}
            <div className="relative px-8 py-6 bg-gradient-to-r to-transparent border-b border-red-400/30">
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl border border-red-400/40">
                            <SquarePlay className="w-5 h-5 text-red-400 rotate-180" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {service.title} (#{instanceId.slice(-4)})
                        </span>
                    </div>
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition border border-red-400/25 hover:border-red-400/40"
                        onClick={onRemove}
                    >
                        <Trash2 size={16} />
                        <span className="text-sm font-medium">Remove</span>
                    </button>
                </div>
            </div>

            {/* Description & Credits */}
            <div className="px-8 py-4 flex justify-between items-center bg-gradient-to-r from-gray-800/50 to-transparent border-b border-gray-700/40">
                <span className="text-gray-300 text-sm font-medium">{service.description}</span>
                <div className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 rounded-full">
                    <span className="text-red-300 text-sm font-bold">
                        Credits: {service.credits}
                    </span>
                </div>
            </div>

            {/* Main Form */}
            <div className="px-8 py-8 space-y-8">
                {/* Outro Text */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <SquarePlay className="w-4 h-4 text-red-400 rotate-180" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Outro Text/Message
                        </label>
                    </div>
                    <input
                        type="text"
                        className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all"
                        value={outroText}
                        onChange={(e) => setOutroText(e.target.value)}
                        placeholder="E.g. Thanks for watching! Subscribe for more."
                    />
                </div>

                {/* Duration */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Duration (seconds)
                        </label>
                    </div>
                    <input
                        type="number"
                        min={0}
                        className="w-40 px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 8"
                    />
                </div>

                {/* Style (single select) */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Style
                        </label>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {styleOptions.map((st) => (
                            <button
                                key={st}
                                type="button"
                                onClick={() => setStyle(st)}
                                className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-200 backdrop-blur-sm ${style === st
                                        ? "bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white shadow-lg shadow-red-500/25 scale-105"
                                        : "bg-gray-800/50 border-gray-600/50 text-gray-300 hover:border-red-400/50 hover:bg-gray-700/50 hover:text-white"
                                    }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add Music/Animation Toggle */}
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        checked={addMusic}
                        id={`music-${instanceId}`}
                        className="accent-red-500 h-5 w-5"
                        onChange={() => setAddMusic(!addMusic)}
                    />
                    <label htmlFor={`music-${instanceId}`} className="text-gray-300 font-semibold">
                        Add Background Music or Animation{" "}
                        <span className="text-red-400">(optional)</span>
                    </label>
                </div>

                {/* Reference Link and Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload File */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Upload className="w-4 h-4 text-red-400" />
                            <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Upload Reference File
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={handleFileChange}
                                accept="video/*,image/*"
                            />
                            <div className="flex items-center justify-center w-full h-24 px-6 py-4 border-2 border-dashed border-gray-600/50 rounded-xl bg-gray-800/30 hover:border-red-400/50 hover:bg-gray-800/50 transition-all cursor-pointer">
                                <div className="text-center">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                                    <p className="text-gray-300 font-medium">
                                        {uploadedFile ? uploadedFile.name : "Click or drag to upload file"}
                                    </p>
                                    <p className="text-sm text-gray-500">Video, image, or design files</p>
                                </div>
                            </div>
                        </div>
                        {uploadedFile && (
                            <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-400/30 rounded-lg text-red-400 text-sm font-medium">
                                Uploaded: {uploadedFile.name}
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
                                setUploadedFile(null);
                                setReferenceLink(e.target.value);
                            }}
                            placeholder="https://example.com/sample-outro"
                        />
                        <p className="text-sm text-gray-400 ml-1">
                            Paste a sample or inspiration link (optional)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OutroForm;
