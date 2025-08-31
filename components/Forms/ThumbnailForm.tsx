import React, { useState, ChangeEvent } from "react";
import { Trash2, Image as ImageIcon, Upload, Link2, Palette } from "lucide-react";

function ThumbnailForm({ onRemove, instanceId, service }: any) {
    // Local form state
    const [thumbnailText, setThumbnailText] = useState("");
    const [colorPalette, setColorPalette] = useState<string[]>([]); // Multiple selectable colors
    const [style, setStyle] = useState<string | null>(null);
    const [referenceLink, setReferenceLink] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [note, setNote] = useState("");

    // Predefined options for user selection
    const colorOptions = ["Red", "Black", "White", "Grey"];
    const styleOptions = [
        "Bold",
        "Minimalist",
        "3D/Pop",
        "Cartoonish",
        "Professional",
        "Cinematic",
    ];

    // Handle toggle for color palettes (multi-select)
    const handleColorToggle = (color: string) => {
        setColorPalette((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );
    };

    // Handle style selection (single select)
    const handleStyleSelect = (selectedStyle: string) => {
        setStyle(selectedStyle);
    };

    // Handle file upload
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
            setReferenceLink(""); // Clear link if file uploaded
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
                            <ImageIcon className="w-5 h-5 text-red-400" />
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
                        Credits: {service.credits}
                    </span>
                </div>
            </div>

            {/* Form body */}
            <div className="px-8 py-8 space-y-8">
                {/* Thumbnail Text */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <ImageIcon className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Thumbnail Text/Title
                        </label>
                    </div>
                    <input
                        type="text"
                        className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all duration-200"
                        value={thumbnailText}
                        onChange={(e) => setThumbnailText(e.target.value)}
                        placeholder="E.g. 5 YouTube Tricks You Didn’t Know!"
                    />
                </div>

                {/* Color Palette (multi-select) */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Additional notes
                        </label>
                    </div>
                    <input
                        type="text"
                        className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all duration-200"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Description of thumnail you want"
                    />
                </div>

                {/* Style (single-select) */}
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
                                onClick={() => handleStyleSelect(st)}
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

                {/* Reference Link and Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload File */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Upload className="w-4 h-4 text-red-400" />
                            <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Upload Reference Image
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <div className="flex items-center justify-center w-full h-28 px-6 py-4 border-2 border-dashed border-gray-600/50 rounded-xl bg-gray-800/30 backdrop-blur-sm hover:border-red-400/50 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer">
                                <div className="text-center">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-300 font-medium">
                                        {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                                    </p>
                                    <p className="text-sm text-gray-500">Image files only (jpg, png, etc.)</p>
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
                            className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all duration-200"
                            value={referenceLink}
                            onChange={(e) => {
                                setUploadedFile(null);
                                setReferenceLink(e.target.value);
                            }}
                            placeholder="https://example.com/sample-thumbnail"
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

export default ThumbnailForm;
