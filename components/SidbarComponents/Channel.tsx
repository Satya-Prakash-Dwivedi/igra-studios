"use client";

import { useEffect, useState, useCallback, ChangeEvent } from "react";

// --- TYPES & CONSTANTS (Moved to top level) ---
type Pace = "Slow" | "Normal" | "Fast" | "Super";
type Tone = "Funny" | "Elegant" | "Serious" | "Casual" | "Professional" | "Informational";

type Channel = {
    id: string;
    name: string;
    link: string;
    pace: Pace;
    tone: Tone;
    description?: string;
    logo?: string;
};

const paceOptions: Pace[] = ["Slow", "Normal", "Fast", "Super"];
const toneOptions: Tone[] = ["Funny", "Elegant", "Serious", "Casual", "Professional", "Informational"];

// ====================================================================
// 1. NEW COMPONENT: AddChannelForm
// ====================================================================
// This is now a standalone component. It receives state and functions as props.
function AddChannelForm({
    onCancel,
    onAddChannel,
    onUploadLogo,
    newChannel,
    setNewChannel,
    uploadingLogo,
}: {
    onCancel: () => void;
    onAddChannel: () => void;
    onUploadLogo: (file: File, channel: Partial<Channel>, isNew: boolean) => void;
    newChannel: Partial<Channel>;
    setNewChannel: React.Dispatch<React.SetStateAction<Partial<Channel>>>;
    uploadingLogo: string | null;
}) {
    // This component now has its own internal logic for handling input changes
    // This fixes the cursor-jumping bug for the "Add New" form
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewChannel((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-[#171717] border border-zinc-700 rounded-xl p-6 shadow-md flex flex-col md:flex-row gap-8">
            {/* Left Side: Logo */}
            <div className="flex-shrink-0 w-full md:w-48 flex flex-col items-center">
                <div className="w-32 h-32 border-2 border-zinc-600 rounded-full overflow-hidden flex items-center justify-center bg-black mb-4">
                    {uploadingLogo === 'new' ? (
                        <p className="text-white text-sm">Uploading...</p>
                    ) : newChannel.logo ? (
                        <img src={newChannel.logo} alt="logo" className="w-full h-full object-cover" /> 
                    ) : (
                        <span className="text-zinc-400">Logo</span>
                    )}
                </div>
                <input
                    type="file"
                    id="logo-upload-new"
                    accept="image/*"
                    disabled={uploadingLogo !== null}
                    onChange={(e) => e.target.files && onUploadLogo(e.target.files[0], {}, true)}
                    className="hidden"
                />
                <label
                    htmlFor="logo-upload-new"
                    className="cursor-pointer bg-zinc-700 border border-zinc-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-600 transition-colors"
                >
                    Choose file
                </label>
            </div>
            
            {/* Right Side: Fields */}
            <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name" // Add name attribute
                        value={newChannel.name || ""}
                        onChange={handleChange} // Use internal handler
                        placeholder="Channel Name"
                        className="p-3 border border-zinc-600 rounded text-white bg-black placeholder-zinc-400"
                    />
                    <input
                        type="text"
                        name="link" // Add name attribute
                        value={newChannel.link || ""}
                        onChange={handleChange} // Use internal handler
                        placeholder="Channel Link (https://...)"
                        className="p-3 border border-zinc-600 rounded text-white bg-black placeholder-zinc-400"
                    />
                    <textarea
                        name="description" // Add name attribute
                        value={newChannel.description || ""}
                        onChange={handleChange} // Use internal handler
                        placeholder="Description"
                        className="md:col-span-2 p-3 border border-zinc-600 rounded text-white bg-black placeholder-zinc-400"
                        rows={3}
                    />
                    <select
                        name="pace" // Add name attribute
                        value={newChannel.pace || "Normal"}
                        onChange={handleChange} // Use internal handler
                        className="p-3 border border-zinc-600 rounded bg-black text-white"
                    >
                        {paceOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select
                        name="tone" // Add name attribute
                        value={newChannel.tone || "Casual"}
                        onChange={handleChange} // Use internal handler
                        className="p-3 border border-zinc-600 rounded bg-black text-white"
                    >
                        {toneOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={onAddChannel}
                        disabled={uploadingLogo !== null}
                        className="px-6 py-2 bg-[#FE4231] hover:bg-[#E03A2A] rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                        Add Channel
                    </button>
                    <button
                        onClick={onCancel}
                        disabled={uploadingLogo !== null}
                        className="px-6 py-2 border border-zinc-600 rounded-lg font-semibold hover:bg-zinc-700 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

// ====================================================================
// 2. NEW COMPONENT: ChannelCard
// ====================================================================
// This renders a single channel card. It also fixes the cursor-jumping
// bug for the *existing* channel list.
function ChannelCard({
    channel,
    onUploadLogo,
    onDelete,
    onSave,
    uploadingLogo,
}: {
    channel: Channel;
    onUploadLogo: (file: File, channel: Partial<Channel>, isNew: boolean) => void;
    onDelete: (id: string) => void;
    onSave: (channel: Channel) => void;
    uploadingLogo: string | null;
}) {
    // This component now manages its *own* state for the channel
    // It is initialized from the `channel` prop.
    const [localChannel, setLocalChannel] = useState(channel);
    
    // Sync if the prop changes from the server
    useEffect(() => {
        setLocalChannel(channel);
    }, [channel]);

    // Internal handler for input changes
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setLocalChannel((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-[#171717] border border-zinc-700 rounded-xl p-6 shadow-md flex flex-col md:flex-row gap-8">
            {/* Left Side: Logo */}
            <div className="flex-shrink-0 w-full md:w-48 flex flex-col items-center">
                <div className="w-32 h-32 border-2 border-zinc-600 rounded-full overflow-hidden flex items-center justify-center bg-black mb-4">
                    {uploadingLogo === localChannel.id ? (
                        <p className="text-white text-sm">Uploading...</p>
                    ) : localChannel.logo ? (
                        <img src={localChannel.logo} alt="logo" className="w-full h-full object-cover" /> 
                    ) : (
                        <span className="text-zinc-400">Logo</span>
                    )}
                </div>
                <input
                    type="file"
                    id={`logo-upload-${localChannel.id}`}
                    accept="image/*"
                    disabled={uploadingLogo !== null}
                    onChange={(e) => e.target.files && onUploadLogo(e.target.files[0], localChannel, false)}
                    className="hidden"
                />
                <label
                    htmlFor={`logo-upload-${localChannel.id}`}
                    className="cursor-pointer bg-zinc-700 border border-zinc-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-600 transition-colors"
                >
                    Change Logo
                </label>
            </div>
            
            {/* Right Side: Fields */}
            <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={localChannel.name}
                        onChange={handleChange}
                        placeholder="Channel Name"
                        className="p-3 border border-zinc-600 rounded text-white bg-black placeholder-zinc-400"
                    />
                    <input
                        type="text"
                        name="link"
                        value={localChannel.link}
                        onChange={handleChange}
                        placeholder="Channel Link"
                        className="p-3 border border-zinc-600 rounded text-white bg-black placeholder-zinc-400"
                    />
                    <textarea
                        name="description"
                        value={localChannel.description || ""}
                        onChange={handleChange}
                        placeholder="Description"
                        className="md:col-span-2 p-3 border border-zinc-600 rounded text-white bg-black placeholder-zinc-400"
                        rows={3}
                    />
                    <select
                        name="pace"
                        value={localChannel.pace}
                        onChange={handleChange}
                        className="p-3 border border-zinc-600 rounded bg-black text-white"
                    >
                        {paceOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select
                        name="tone"
                        value={localChannel.tone}
                        onChange={handleChange}
                        className="p-3 border border-zinc-600 rounded bg-black text-white"
                    >
                        {toneOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => onSave(localChannel)}
                        disabled={uploadingLogo !== null}
                        className="px-5 py-2 border border-zinc-600 rounded-lg font-semibold hover:bg-zinc-700 transition-colors disabled:opacity-50"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => onDelete(localChannel.id)}
                        disabled={uploadingLogo !== null}
                        className="px-5 py-2 text-red-500 border border-red-500/50 rounded-lg font-semibold hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// ====================================================================
// 3. MAIN COMPONENT: ChannelPage
// ====================================================================
// This component now ONLY manages state and API calls.
// All UI is handled by the components above.
export default function ChannelPage() {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [loading, setLoading] = useState(true);
    const [newChannel, setNewChannel] = useState<Partial<Channel>>({
        pace: "Normal",
        tone: "Casual"
    });
    const [uploadingLogo, setUploadingLogo] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Fetch data on load
    useEffect(() => {
        fetchChannels();
    }, []);

    // --- API FUNCTIONS ---
    // We wrap all functions passed as props in `useCallback`
    // This stops them from being recreated on every render

    const fetchChannels = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/channel", {
            credentials: "include",
            cache: "no-store",
        });
        if (res.ok) {
            const data = await res.json();
            setChannels(data.channels);
        }
        setLoading(false);
    }, []); // Empty dependency array, this function is stable

    const addChannel = useCallback(async () => {
        if (!newChannel.name || !newChannel.link) return alert("Name and Link required");

        const res = await fetch("/api/channel", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newChannel),
            credentials: "include",
        });

        if (res.ok) {
            const { channel } = await res.json();
            setChannels((prev) => [...prev, channel]); // Use functional update
            setNewChannel({ pace: "Normal", tone: "Casual" });
            setShowAddForm(false);
        }
    }, [newChannel]); // Depends on `newChannel`

    const updateChannel = useCallback(async (channel: Channel) => {
        const res = await fetch("/api/channel", {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(channel),
            credentials: "include",
        });
        if (res.ok) {
            // Refetch all channels to get server truth
            // This also updates the local state in ChannelCard via prop change
            fetchChannels(); 
        }
    }, [fetchChannels]); // Depends on `fetchChannels`

    const deleteChannel = useCallback(async (id: string) => {
        const res = await fetch(`/api/channel?id=${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (res.ok) {
            setChannels((prev) => prev.filter(c => c.id !== id)); // Optimistic update
        }
    }, []); // Empty dependency array, stable

    const uploadLogo = useCallback(async (file: File, channel: Partial<Channel>, isNew: boolean) => {
        const channelId = channel.id || "new";
        setUploadingLogo(channelId);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("bucket", "logos"); 

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
                credentials: "include", 
            });

            if (!uploadRes.ok) {
                const { error } = await uploadRes.json();
                throw new Error(error || "File upload failed");
            }

            const { url: permanentUrl } = await uploadRes.json();

            if (isNew) {
                setNewChannel((prev) => ({ ...prev, logo: permanentUrl }));
            } else {
                // Update the channel in the main list
                setChannels((prevChannels) =>
                    prevChannels.map((c) =>
                        c.id === channel.id ? { ...c, logo: permanentUrl } : c
                    )
                );
                // Also save this change immediately
                const updatedChannel = { ...channel, logo: permanentUrl } as Channel;
                await updateChannel(updatedChannel);
            }

        } catch (error: any) {
            console.error(error);
            alert(`Error uploading logo: ${error.message}`);
        } finally {
            setUploadingLogo(null);
        }
    }, [updateChannel]); // Depends on `updateChannel`

    // --- RENDER ---
    if (loading) return <p className="text-white p-8">Loading channels...</p>;

    // SCENARIO 1: No channels
    if (channels.length === 0) {
        return (
            <div className="p-8 bg-black min-h-screen text-white max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-10 text-center">Add Your First Channel</h2>
                <AddChannelForm
                    onCancel={() => {}} // No cancel button in this view
                    onAddChannel={addChannel}
                    onUploadLogo={uploadLogo}
                    newChannel={newChannel}
                    setNewChannel={setNewChannel}
                    uploadingLogo={uploadingLogo}
                />
            </div>
        );
    }

    // SCENARIO 2: Has channels
    return (
        <div className="p-8 bg-black min-h-screen text-white">
            <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold">Your Channels</h2>
                {!showAddForm && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-5 py-2 bg-[#FE4231] hover:bg-[#E03A2A] rounded-lg font-semibold transition-colors"
                    >
                        + Add New Channel
                    </button>
                )}
            </div>

            {/* List of existing channels */}
            <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
                {channels.map((c) => (
                    <ChannelCard
                        key={c.id}
                        channel={c}
                        onUploadLogo={uploadLogo}
                        onDelete={deleteChannel}
                        onSave={updateChannel}
                        uploadingLogo={uploadingLogo}
                    />
                ))}
            </div>

            {/* Conditional "Add New Channel" form */}
            {showAddForm && (
                <div className="max-w-4xl mx-auto">
                    <h3 id="add-channel-form" className="text-3xl font-bold mt-16 mb-10 text-center">
                        Add a New Channel
                    </h3>
                    <div className="mb-8">
                        <AddChannelForm
                            onCancel={() => setShowAddForm(false)}
                            onAddChannel={addChannel}
                            onUploadLogo={uploadLogo}
                            newChannel={newChannel}
                            setNewChannel={setNewChannel}
                            uploadingLogo={uploadingLogo}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}