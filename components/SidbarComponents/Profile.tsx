"use client";

import { useEffect, useState } from "react";
import ProfileSkeleton from "../InnerComponents/ProfileSkeleton";
// No icons are needed anymore, so the import is removed.

// --- UPDATED TYPE ---
// Removed cover_image_url
type Profile = {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    company_name?: string | null;
    photo_url?: string | null;
    wants_email: boolean;
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [file, setFile] = useState<File | null>(null); // For avatar
    // Removed the coverFile state
    const [successMessage, setSuccessMessage] = useState("");

    // Fetch profile (No change)
    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            try {
                const res = await fetch("/api/profile", { credentials: "include" , cache: "no-store"});
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data.profile);
                } else {
                    console.error("Error fetching profile");
                }
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        }
        fetchProfile();
    }, []);

    // --- UPDATED: handleUpdate function ---
    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!profile) return;

        setSaving(true);

        let photoUrl = profile.photo_url;
        // Removed coverUrl logic

        // 1. Upload new AVATAR if selected
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("bucket", "avatars");

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (uploadRes.ok) {
                const { url } = await uploadRes.json();
                photoUrl = url;
            } else {
                alert("Error uploading avatar");
                setSaving(false);
                return;
            }
        }

        // 2. Removed Cover Image upload logic

        // 3. PUT updated profile
        const res = await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                ...profile, 
                photo_url: photoUrl, 
                // Removed cover_image_url
            }),
            credentials: "include",
        });

        setSaving(false);

        if (res.ok) {
            const { profile: updatedProfile } = await res.json();
            setProfile(updatedProfile);
            setFile(null);
            // Removed setCoverFile(null)
            setSuccessMessage("Profile updated successfully!");

            setTimeout(() => setSuccessMessage(""), 3000);
        } else {
            const { error } = await res.json();
            alert("Error: " + error);
        }
    }

    if (loading) return <ProfileSkeleton />;
    if (!profile) return <p className="text-white">No profile found</p>;

    // --- NEW JSX STRUCTURE ---
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <form onSubmit={handleUpdate} className="max-w-5xl mx-auto w-full">
                {/* Success message */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-600 rounded-lg">{successMessage}</div>
                )}

                {/* === SECTION 1: PROFILE HEADER (REMOVED) === */}
                {/* The header section is now gone. */}

                {/* === SECTION 2: PERSONAL INFORMATION === */}
                <div className="bg-[#171717] border border-zinc-700 rounded-xl p-8 shadow-md">
                    <h2 className="text-2xl font-semibold mb-8">Personal Information</h2>

                    {/* Profile Photo Upload */}
                    <div className="mb-8">
                        <label className="block text-lg font-medium text-white mb-4">
                            Profile Image
                        </label>
                        <div className="flex items-center space-x-6">
                            {/* This is just a small preview for the uploader */}
                            <img
                                src={file ? URL.createObjectURL(file) : profile.photo_url || "/default-avatar.png"}
                                alt="Profile"
                                className="w-20 h-20 rounded-lg object-cover border border-white/20"
                            />
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
                                    className="cursor-pointer bg-zinc-700 border border-zinc-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-zinc-600 transition-colors"
                                >
                                    Choose file
                                </label>
                                {profile.photo_url && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFile(null);
                                            setProfile({ ...profile, photo_url: null });
                                        }}
                                        className="text-red-500 text-sm ml-7 hover:underline self-start"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-base font-medium text-zinc-300 mb-2">First Name</label>
                            <input
                                type="text"
                                value={profile.first_name || ""}
                                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                                className="w-full border border-zinc-600 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#FE4231] focus:border-[#FE4231] outline-none transition-colors text-base"
                            />
                        </div>
                        <div>
                            <label className="block text-base font-medium text-zinc-300 mb-2">Last Name</label>
                            <input
                                type="text"
                                value={profile.last_name || ""}
                                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                                className="w-full border border-zinc-600 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#FE4231] focus:border-[#FE4231] outline-none transition-colors text-base"
                            />
                        </div>
                    </div>

                    {/* Company Field */}
                    <div>
                        <label className="block text-base font-medium text-zinc-300 mb-2">DBA / Company</label>
                        <input
                            type="text"
                            value={profile.company_name || ""}
                            onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                            placeholder="Your company name"
                            className="w-full border border-zinc-600 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-[#FE4231] focus:border-[#FE4231] outline-none transition-colors placeholder-zinc-500 text-base"
                        />
                    </div>
                </div>

                {/* === SECTION 3: NOTIFICATION PREFERENCES === */}
                <div className="bg-[#171717] border border-zinc-700 rounded-xl p-8 mt-8">
                    <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="email-notifications"
                            checked={profile.wants_email ?? true}
                            onChange={(e) => setProfile({ ...profile, wants_email: e.target.checked })}
                            className="w-5 h-5 text-[#FE4231] bg-black border-zinc-600 rounded focus:ring-[#FE4231]"
                        />
                        <label htmlFor="email-notifications" className="text-base text-zinc-200">
                            Send new notifications to my email
                        </label>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-[#FE4231] px-4 py-1 rounded-xl text-white text-md font-semibold hover:bg-[#E03A2A] transition-colors disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}