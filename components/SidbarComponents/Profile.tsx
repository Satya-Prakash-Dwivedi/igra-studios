"use client";

import { useEffect, useState } from "react";

type Profile = {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    company_name?: string | null;
    photo_url?: string | null;
    channel_link?: string | null;
    wants_email: boolean;
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            const res = await fetch("/api/profile", { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setProfile(data.profile);
            }
            setLoading(false);
        }
        fetchProfile();
    }, []);

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!profile) return;

        setSaving(true);

        let photoUrl = profile.photo_url;

        // 📤 Upload file if selected
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            console.log(uploadRes)

            if (uploadRes.ok) {
                const { url } = await uploadRes.json();
                console.log('url: ', url)
                photoUrl = url;
                console.log('photourl', photoUrl)
            } else {
                alert("Error uploading file");
                setSaving(false);
                return;
            }
        }

        // 📝 Save profile updates
        const res = await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...profile, photo_url: photoUrl }),
            credentials: "include",
        });

        setSaving(false);

        if (res.ok) {
            const data = await res.json();
            setProfile(data.profile);
            alert("Profile updated!");
        } else {
            const { error } = await res.json();
            alert("Error: " + error);
        }
    }

    if (loading) return <p className="text-white">Loading...</p>;
    if (!profile) return <p className="text-white">No profile found</p>;

    return (
        <div className="min-h-screen bg-black text-white p-12">
            <div className="max-w-4xl mx-auto w-full">
                {/* Profile Photo Section */}
                <div className="mb-12">
                    <label className="block text-lg font-medium text-white mb-6">
                        Profile photo or logo
                    </label>
                    <div className="flex items-start space-x-6">
                        <div className="relative">
                            <img
                                src={file ? URL.createObjectURL(file) : profile.photo_url || "/default-avatar.png"}
                                alt="Profile"
                                className="w-24 h-24 rounded-lg object-cover border border-white/20"
                            />
                        </div>
                        <div className="flex flex-col space-y-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="hidden"
                                id="photo-upload"
                            />
                            <label
                                htmlFor="photo-upload"
                                className="cursor-pointer bg-zinc-800 border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors"
                            >
                                Choose file
                            </label>
                            <button
                                type="button"
                                onClick={() => {
                                    setFile(null);
                                    setProfile({ ...profile, photo_url: null });
                                }}
                                className="text-blue-400 text-sm hover:underline flex items-center space-x-1 self-start"
                            >
                                <span>×</span>
                                <span>Clear</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-lg font-medium text-white mb-3">
                            First
                        </label>
                        <input
                            type="text"
                            value={profile.first_name || ""}
                            onChange={(e) =>
                                setProfile({ ...profile, first_name: e.target.value })
                            }
                            className="w-full border border-white/30 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-white mb-3">
                            Last
                        </label>
                        <input
                            type="text"
                            value={profile.last_name || ""}
                            onChange={(e) =>
                                setProfile({ ...profile, last_name: e.target.value })
                            }
                            placeholder="Last name"
                            className="w-full border border-white/30 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors placeholder-white/40 text-lg"
                        />
                    </div>
                </div>

                {/* Company Field */}
                <div className="mb-8">
                    <label className="block text-lg font-medium text-white mb-3">
                        DBA / Company
                    </label>
                    <input
                        type="text"
                        value={profile.company_name || ""}
                        onChange={(e) =>
                            setProfile({ ...profile, company_name: e.target.value })
                        }
                        placeholder="Type here..."
                        className="w-full border border-white/30 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors placeholder-white/40 text-lg"
                    />
                </div>

                {/* YouTube Channel Section */}
                <div className="mb-10">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-white ml-0.5"></div>
                        </div>
                        <span className="text-lg font-medium text-white">Have a YouTube channel?</span>
                    </div>
                    <p className="text-base text-white/70 mb-4">Help us get a feel for your audience and style.</p>
                    <input
                        type="text"
                        value={profile.channel_link || ""}
                        onChange={(e) =>
                            setProfile({ ...profile, channel_link: e.target.value })
                        }
                        placeholder="https://www.youtube.com/@yourchannel"
                        className="w-full border border-white/30 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors placeholder-white/40 text-lg"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-6 mb-10">
                    <button
                        type="button"
                        className="bg-black border border-white/30 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-zinc-900 transition-colors"
                    >
                        Change my email
                    </button>
                    <button
                        type="button"
                        className="bg-black border border-white/30 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-zinc-900 transition-colors"
                    >
                        Change my password
                    </button>
                </div>

                {/* Notifications */}
                <div className="mb-12">
                    <h3 className="text-lg font-medium text-white mb-4">Notifications preferences</h3>
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="email-notifications"
                            checked={profile.wants_email ?? true}
                            onChange={(e) =>
                                setProfile({ ...profile, wants_email: e.target.checked })
                            }
                            className="w-5 h-5 text-red-600 bg-black border-white/30 rounded focus:ring-red-500"
                        />
                        <label htmlFor="email-notifications" className="text-base text-white">
                            Send new notifications to my email
                        </label>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleUpdate}
                    disabled={saving}
                    className="bg-[#FF4232] px-8 py-3 rounded-xl text-white text-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}