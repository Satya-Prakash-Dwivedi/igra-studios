import React from "react";

const Chat = () => {
    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-igraRed">Chat with Igra Studios</h1>
                <p className="text-gray-400">
                    Your direct line to your editors. Feel free to ask questions or provide feedback. Or just say hi! 👋
                </p>
            </div>

            {/* Chat Box */}
            <div className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 flex flex-col h-[70vh]">
                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="flex items-start gap-3">
                        {/* Replace this with your real logo */}
                        <img
                            src="/favicon.ico"
                            alt="Igra Studios"
                            className="w-10 h-10 rounded-full border border-igraRed bg-white object-contain"
                        />
                        <div>
                            <p className="text-sm font-semibold text-igraRed">
                                Prithvi <span className="text-gray-400 ml-2 text-xs">6/04/25 Admin</span>
                            </p>
                            <p className="text-gray-300">
                                Welcome to Igra Studios! Let me know if there’s anything I can help you with.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Input Box */}
                <div className="p-4 border-t border-neutral-800 flex items-center gap-3">
                    <button className="text-gray-400 hover:text-igraRed">📎</button>
                    <input
                        type="text"
                        placeholder="Write your message..."
                        className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-igraRed"
                    />
                    <button className="bg-igraRed hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold transition">
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
