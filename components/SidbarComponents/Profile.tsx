"use client";

import { useEffect, useState } from "react";
import ProfileSkeleton from "../InnerComponents/ProfileSkeleton";

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
    const [file, setFile] = useState<File | null>(null);
    const [successMessage, setSuccessMessage] = useState("");

    // Fetch profile
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

    // Update profile
    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!profile) return;

        setSaving(true);

        let photoUrl = profile.photo_url;

        // Upload new file if selected
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("bucket", "avatars")

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (uploadRes.ok) {
                const { url } = await uploadRes.json();
                photoUrl = url;
            } else {
                alert("Error uploading file");
                setSaving(false);
                return;
            }
        }

        // PUT updated profile
        const res = await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...profile, photo_url: photoUrl }),
            credentials: "include",
        });

        setSaving(false);

        if (res.ok) {
            const { profile: updatedProfile } = await res.json();
            setProfile(updatedProfile); // ✅ update state first
            setFile(null);
            setSuccessMessage("Profile updated successfully!"); // ✅ show message after state update

            // Hide success message after 3s
            setTimeout(() => setSuccessMessage(""), 3000);
        } else {
            const { error } = await res.json();
            alert("Error: " + error);
        }
    }

    if (loading) return <ProfileSkeleton />;
    if (!profile) return <p className="text-white">No profile found</p>;

    return (
        <div className="min-h-screen bg-black text-white p-12">
            <div className="max-w-4xl mx-auto w-full">
                {/* Success message */}
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-600 rounded">{successMessage}</div>
                )}

                {/* Profile Photo */}
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
                            {profile.photo_url && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFile(null);
                                        setProfile({ ...profile, photo_url: null });
                                    }}
                                    className="text-blue-400 text-sm hover:underline flex items-center space-x-1 self-start ml-7"
                                >
                                    <span>Remove</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-lg font-medium text-white mb-3">First</label>
                        <input
                            type="text"
                            value={profile.first_name || ""}
                            onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                            className="w-full border border-white/30 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-white mb-3">Last</label>
                        <input
                            type="text"
                            value={profile.last_name || ""}
                            onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                            className="w-full border border-white/30 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors text-lg"
                        />
                    </div>
                </div>

                {/* Company Field */}
                <div className="mb-8">
                    <label className="block text-lg font-medium text-white mb-3">DBA / Company</label>
                    <input
                        type="text"
                        value={profile.company_name || ""}
                        onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                        placeholder="Type here..."
                        className="w-full border border-white/30 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors placeholder-white/40 text-lg"
                    />
                </div>

                {/* Notifications */}
                <div className="mb-12">
                    <h3 className="text-lg font-medium text-white mb-4">Notifications preferences</h3>
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="email-notifications"
                            checked={profile.wants_email ?? true}
                            onChange={(e) => setProfile({ ...profile, wants_email: e.target.checked })}
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
