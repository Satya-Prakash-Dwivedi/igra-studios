"use client";

import React, { useState, ChangeEvent, DragEvent } from 'react';
import { X, UploadCloud } from 'lucide-react'; // Removed ArrowLeft as it's less relevant for a page

// Define the props the page will accept (only onSubmit needed now)
interface ReportPageProps {
  onSubmit: (reportData: { description: string; files: File[] }) => void; // Function to handle submission
}

// Renamed component from ReportModal to ReportPage
function ReportPage({ onSubmit }: ReportPageProps) {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection from input or drag-and-drop
  const handleFileChange = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  // Handle the form submission
  const handleSubmit = () => {
    if (!description.trim()) {
      alert('Please describe the issue.');
      return;
    }
    onSubmit({ description, files });
    // Keep form data after submission unless you explicitly clear it
  };

  // Removed the 'if (!isOpen)' check

  // Render the page UI
  return (
    // Standard page container - removed fixed positioning and backdrop
    <div className="min-h-screen bg-black text-white p-8 flex justify-center">
      {/* Content container - adjusted for page layout */}
      <div className="bg-black border border-zinc-700 rounded-xl shadow-xl w-full max-w-2xl h-fit"> {/* Use h-fit for natural height */}
        {/* Header - Removed back button logic */}
        <div className="flex items-center justify-center p-6 border-b border-zinc-700 relative">
           {/* If you need a back button, you'd add it here using next/navigation */}
           {/* <button onClick={() => router.back()} className="absolute left-6 text-zinc-400 hover:text-white transition-colors"> <ArrowLeft size={20} /> </button> */}
           <h2 className="text-xl font-semibold text-white text-center">
             Find something that isn't working as expected?
           </h2>
        </div>

        {/* Body (No changes needed in this section) */}
        <div className="p-8 space-y-8">
          <p className="text-zinc-300 text-center">
            We appreciate you helping us build Igra Studios into the best app it can be!
          </p>

          {/* Description Section */}
          <div className="space-y-3">
            <label htmlFor="bug-description" className="block text-lg font-medium text-white">
              What isn't working as expected?
            </label>
            <p className="text-sm text-zinc-400">
              Please use as many descriptors as possible to expedite a fix. What were you doing when you found the bug? How might we replicate it?
            </p>
            <textarea
              id="bug-description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type here..."
              className="w-full p-3 border border-zinc-600 rounded-lg bg-zinc-900 text-white placeholder-zinc-500 focus:ring-2 focus:ring-[#FE4231] focus:border-[#FE4231] outline-none transition-colors resize-none"
            />
          </div>

          <hr className="border-zinc-700" />

          {/* File Upload Section */}
          <div className="space-y-4">
            <label className="block text-lg font-medium text-white">
              Upload screenshots if applicable
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragging ? 'border-[#FE4231] bg-zinc-800' : 'border-zinc-600 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800'
              }`}
            >
              <UploadCloud className={`w-10 h-10 mb-3 ${isDragging ? 'text-[#FE4231]' : 'text-zinc-500'}`} />
              <p className={`text-center ${isDragging ? 'text-white' : 'text-zinc-400'}`}>
                <span className="font-semibold">Drop files here to upload</span> (or click)
              </p>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*,video/*"
              />
            </div>

            {/* Display selected files */}
            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">Selected files:</p>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-zinc-800 p-2 rounded">
                      <span className="text-sm text-zinc-300 truncate">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-400 ml-2 flex-shrink-0"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-zinc-700">
          <button
            onClick={handleSubmit}
            disabled={!description.trim()}
            className="w-full bg-[#FE4231] px-6 py-3 rounded-lg text-white text-base font-semibold hover:bg-[#E03A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send bug report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportPage; // Renamed export

