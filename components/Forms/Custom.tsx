import React, { useState, ChangeEvent } from "react";
import { Trash2, MessageSquareShare, Upload, Link2, FileText } from "lucide-react";

function CustomForm({ onRemove, instanceId, service }: any) {
    const [description, setDescription] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [referenceLink, setReferenceLink] = useState("");
    const [contact, setContact] = useState("");

    // File input logic
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setUploadedFile(e.target.files[0]);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 border border-red-500/30 rounded-2xl shadow-2xl overflow-hidden mb-8 backdrop-blur-sm">
            {/* Header */}
            <div className="relative px-8 py-6 bg-gradient-to-r from-black/90 via-gray-900/80 to-transparent border-b border-red-400/30">
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl border border-red-400/30">
                            <MessageSquareShare className="w-5 h-5 text-red-400" />
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
                <div className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 rounded-full">
                    <span className="text-red-300 text-sm font-bold">
                        Credits: {service.credits}
                    </span>
                </div>
            </div>

            {/* Main Form */}
            <div className="px-8 py-8 space-y-8">
                {/* Description */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Describe your Custom Request
                        </label>
                    </div>
                    <textarea
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-600/50 bg-gray-800/50 resize-none text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition-all"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Describe exactly what you need. Be as specific as possible!"
                    />
                </div>

                {/* Upload and Reference Link */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Upload className="w-4 h-4 text-red-400" />
                            <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Upload Asset (optional)
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={handleFileChange}
                                accept="image/*,video/*,.pdf,.doc,.docx"
                            />
                            <div className="flex items-center justify-center w-full h-24 px-6 py-4 border-2 border-dashed border-gray-600/50 rounded-xl bg-gray-800/30 hover:border-red-400/50 hover:bg-gray-800/50 transition-all cursor-pointer">
                                <div className="text-center">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                                    <p className="text-gray-300 font-medium">
                                        {uploadedFile ? uploadedFile.name : "Click or drag to upload"}
                                    </p>
                                    <p className="text-sm text-gray-500">Images, docs, reference files</p>
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
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Link2 className="w-4 h-4 text-red-400" />
                            <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Paste Reference Link (optional)
                            </label>
                        </div>
                        <input
                            type="url"
                            className="w-full px-4 py-4 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20"
                            value={referenceLink}
                            onChange={e => setReferenceLink(e.target.value)}
                            placeholder="Google Doc, Figma, Dropbox, etc."
                        />
                        <p className="text-sm text-gray-400 ml-1">
                            Paste a sample, doc, or asset link for context.
                        </p>
                    </div>
                </div>

                {/* Contact method */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <MessageSquareShare className="w-4 h-4 text-red-400" />
                        <label className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            How should we contact you for clarifications? (optional)
                        </label>
                    </div>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-600/50 bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:border-red-400/70 focus:outline-none focus:ring-2 focus:ring-red-400/20"
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        placeholder="Email, Discord, Telegram, etc."
                    />
                </div>
            </div>
        </div>
    );
}

export default CustomForm;
